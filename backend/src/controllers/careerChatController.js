const CareerChat = require("../models/CareerChat");
const Resume = require("../models/Resume");
const { analyzeResume } = require("../services/aiService");

const HISTORY_LIMIT = 10;

// Send a career question
const sendMessage = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        message: "Message must not exceed 2000 characters",
      });
    }

    let chat = await CareerChat.findOne({
      user: userId,
    });

    if (!chat) {
      chat = await CareerChat.create({
        user: userId,
        messages: [],
      });
    }

    const resume = await Resume.findOne({
      user: userId,
    });

    const history = chat.messages
      .slice(-HISTORY_LIMIT)
      .map((item) => ({
        role: item.role,
        content: item.content,
      }));

    const prompt = `
You are a career guidance assistant for a B.Tech student preparing for placements.

Candidate resume (may be empty):
${resume ? JSON.stringify(resume, null, 2) : "No resume saved yet."}

Previous conversation:
${JSON.stringify(history, null, 2)}

Candidate's new question:
${message.trim()}

Give a practical and concise answer.

Return ONLY this JSON structure:

{
  "answer": ""
}

Rules:
- answer must be a string.
- Focus on career, skills, jobs, interviews, learning paths, and placements.
- Use the resume when it helps, but do not repeat it back.
- Do not return markdown.
- Do not add text outside the JSON.
`;

    const analysis = await analyzeResume({
      careerChatPrompt: prompt,
    });

    const answer =
      (analysis.answer && analysis.answer.trim()) ||
      "Sorry, I could not generate a response. Please try again.";

    chat.messages.push({
      role: "user",
      content: message.trim(),
    });

    chat.messages.push({
      role: "assistant",
      content: answer,
    });

    await chat.save();

    res.status(200).json({
      message: "Career response generated successfully",
      reply: answer,
      messages: chat.messages,
    });
  } catch (error) {
    console.error("CAREER CHAT ERROR:", error.message);
    next(error);
  }
};

// Get conversation history
const getChat = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const chat = await CareerChat.findOne({
      user: userId,
    });

    res.status(200).json({
      message: "Chat fetched successfully",
      messages: chat ? chat.messages : [],
    });
  } catch (error) {
    console.error("GET CAREER CHAT ERROR:", error.message);
    next(error);
  }
};

// Clear conversation history
const clearChat = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    await CareerChat.findOneAndUpdate(
      { user: userId },
      { messages: [] }
    );

    res.status(200).json({
      message: "Chat cleared successfully",
      messages: [],
    });
  } catch (error) {
    console.error("CLEAR CAREER CHAT ERROR:", error.message);
    next(error);
  }
};

module.exports = {
  sendMessage,
  getChat,
  clearChat,
};