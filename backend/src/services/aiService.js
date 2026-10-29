require("dotenv").config();
const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const FALLBACK_MODEL = process.env.GEMINI_FALLBACK_MODEL;

const stringArray = {
  type: Type.ARRAY,
  items: { type: Type.STRING },
};

const resumeSchema = {
  type: Type.OBJECT,
  properties: {
    mainSkills: stringArray,
    strongAreas: stringArray,
    missingSkills: stringArray,
    suitableRoles: stringArray,
    suggestions: stringArray,
  },
  required: [
    "mainSkills",
    "strongAreas",
    "missingSkills",
    "suitableRoles",
    "suggestions",
  ],
};

const skillGapSchema = {
  type: Type.OBJECT,
  properties: {
    currentSkills: stringArray,
    requiredSkills: stringArray,
    missingSkills: stringArray,
    recommendations: stringArray,
  },
  required: [
    "currentSkills",
    "requiredSkills",
    "missingSkills",
    "recommendations",
  ],
};

const interviewQuestionsSchema = {
  type: Type.OBJECT,
  properties: {
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          difficulty: { type: Type.STRING },
        },
        required: ["question", "difficulty"],
      },
    },
  },
  required: ["questions"],
};

const interviewEvaluationSchema = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.NUMBER },
    feedback: { type: Type.STRING },
    strengths: stringArray,
    improvements: stringArray,
  },
  required: ["score", "feedback", "strengths", "improvements"],
};

const roadmapSchema = {
  type: Type.OBJECT,
  properties: {
    currentLevel: { type: Type.STRING },
    phases: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          duration: { type: Type.STRING },
          skills: stringArray,
          tasks: stringArray,
        },
        required: ["title", "duration", "skills", "tasks"],
      },
    },
  },
  required: ["currentLevel", "phases"],
};

const careerChatSchema = {
  type: Type.OBJECT,
  properties: {
    answer: { type: Type.STRING },
  },
  required: ["answer"],
};

// ---------- Retry handling for temporary Gemini errors ----------

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryable = (error) => {
  const status = Number(error?.status);
  if ([429, 500, 503, 504].includes(status)) return true;
  return /UNAVAILABLE|overloaded|high demand|RESOURCE_EXHAUSTED/i.test(
    error?.message || ""
  );
};

const ATTEMPTS_PER_MODEL = 3;
const RETRY_DELAYS_MS = [1000, 3000]; // waits between attempts on one model

const generateWithRetry = async (request) => {
  // Try the primary model first, then the fallback (if configured)
  const models = [request.model, FALLBACK_MODEL].filter(Boolean);
  let lastError;

  for (const model of models) {
    for (let attempt = 1; attempt <= ATTEMPTS_PER_MODEL; attempt++) {
      try {
        return await ai.models.generateContent({ ...request, model });
      } catch (error) {
        lastError = error;

        // Log the real Gemini error so 429 (quota) vs 503 (overload) is visible
        console.error(
          `GEMINI ERROR [${model}] attempt ${attempt}/${ATTEMPTS_PER_MODEL}:`,
          error?.status,
          error?.message
        );

        // Non-temporary errors (bad key, bad model name, bad request) fail fast
        if (!isRetryable(error)) throw error;

        if (attempt < ATTEMPTS_PER_MODEL) {
          const jitter = Math.random() * 500;
          await sleep(RETRY_DELAYS_MS[attempt - 1] + jitter);
        }
      }
    }
  }

  const busy = new Error(
    "The AI service is busy right now. Please try again in a minute."
  );
  busy.status = 503;
  busy.cause = lastError;
  throw busy;
};

// ---------- Main function used by every feature ----------

const analyzeResume = async (data) => {
  let prompt;
  let schema;

  if (data.skillGapPrompt) {
    prompt = data.skillGapPrompt;
    schema = skillGapSchema;
  } else if (data.interviewPrompt) {
    prompt = data.interviewPrompt;
    schema =
      data.interviewMode === "evaluation"
        ? interviewEvaluationSchema
        : interviewQuestionsSchema;
  } else if (data.roadmapPrompt) {
    prompt = data.roadmapPrompt;
    schema = roadmapSchema;
  } else if (data.careerChatPrompt) {
    prompt = data.careerChatPrompt;
    schema = careerChatSchema;
  } else {
    prompt = `
You are an AI career assistant.

Analyze the following data:

${JSON.stringify(data, null, 2)}

Return valid JSON only. Do not use markdown.
`;
    schema = resumeSchema;
  }

  const response = await generateWithRetry({
    model: MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const output = response.text;

  if (!output) {
    throw new Error("AI returned an empty response");
  }

  try {
    return JSON.parse(output);
  } catch (error) {
    console.error("AI JSON PARSE ERROR:", output);
    throw new Error("AI returned invalid JSON");
  }
};

module.exports = { analyzeResume };