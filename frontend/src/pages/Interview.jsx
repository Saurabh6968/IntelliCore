import { useState } from 'react'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001'

function getToken() {
  return localStorage.getItem('token')
}

async function apiRequest(path, body) {
  const response = await fetch(`${API_URL}/api/interview${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(body)
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

function parseFeedback(raw) {
  try {
    const parsed = JSON.parse(raw)
    return {
      feedback: parsed.feedback || '',
      strengths: parsed.strengths || [],
      improvements: parsed.improvements || []
    }
  } catch {
    return { feedback: raw || '', strengths: [], improvements: [] }
  }
}

function Interview() {
  const [targetRole, setTargetRole] = useState('')
  const [interviewId, setInterviewId] = useState(null)
  const [questions, setQuestions] = useState([])
  const [results, setResults] = useState([])

  const [answer, setAnswer] = useState('')
  const [questionNumber, setQuestionNumber] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [completed, setCompleted] = useState(false)

  const [starting, setStarting] = useState(false)
  const [evaluating, setEvaluating] = useState(false)
  const [error, setError] = useState('')

  const started = questions.length > 0
  const currentQuestion = questions[questionNumber - 1]
  const currentResult = results[questionNumber - 1]

  const progress = started
    ? (questionNumber / questions.length) * 100
    : 0

  const averageScore = results.length
    ? results.reduce((sum, r) => sum + (r.score || 0), 0) /
      results.length
    : 0

  async function handleStart() {
    if (!targetRole.trim()) return

    setError('')
    setStarting(true)

    try {
      const startData = await apiRequest('/start', {
        targetRole: targetRole.trim()
      })

      const questionData = await apiRequest('/questions', {
        targetRole: targetRole.trim()
      })

      if (!questionData.questions || questionData.questions.length === 0) {
        throw new Error('No questions were generated. Please try again.')
      }

      setInterviewId(startData.interview._id)
      setQuestions(questionData.questions)
      setResults([])
      setQuestionNumber(1)
      setAnswer('')
      setSubmitted(false)
      setCompleted(false)
    } catch (err) {
      setError(
        err.message === 'Resume not found'
          ? 'Please analyze your resume first, then start the interview.'
          : err.message
      )
    } finally {
      setStarting(false)
    }
  }

  async function handleSubmit() {
    if (!answer.trim() || evaluating) return

    setError('')
    setEvaluating(true)

    try {
      const data = await apiRequest(`/${interviewId}/answer`, {
        question: currentQuestion.question,
        answer: answer.trim()
      })

      const saved =
        data.interview.questions[data.interview.questions.length - 1]

      const result = {
        score: saved.score ?? 0,
        ...parseFeedback(saved.feedback)
      }

      setResults((prev) => {
        const updated = [...prev]
        updated[questionNumber - 1] = result
        return updated
      })

      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setEvaluating(false)
    }
  }

  function handleNext() {
    if (questionNumber < questions.length) {
      setQuestionNumber(questionNumber + 1)
      setAnswer('')
      setSubmitted(false)
      setError('')
    } else {
      setCompleted(true)
    }
  }

  function handleRestart() {
    setInterviewId(null)
    setQuestions([])
    setResults([])
    setAnswer('')
    setQuestionNumber(1)
    setSubmitted(false)
    setCompleted(false)
    setError('')
  }

  return (
    <div className="interview-page">

      {/* Header */}

      <div className="page-header">

        <span className="card-eyebrow">
          AI INTERVIEW
        </span>

        <h1>AI Interview Practice</h1>

        <p>
          Practice interview questions and improve your
          placement readiness.
        </p>

      </div>


      {/* Setup */}

      {!started && (
        <div className="interview-question-card">

          <div className="interview-question-header">

            <div className="ai-avatar">
              AI
            </div>

            <div>
              <span>
                AI INTERVIEWER
              </span>

              <strong>
                Personalized from your resume
              </strong>
            </div>

          </div>

          <div className="answer-area">

            <label>
              TARGET ROLE
            </label>

            <input
              className="interview-role-input"
              type="text"
              value={targetRole}
              onChange={(event) => setTargetRole(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleStart()
              }}
              placeholder="e.g. Backend Developer"
              disabled={starting}
            />

            <div className="answer-footer">

              <span>
                Questions are generated from your resume.
              </span>

              <button
                onClick={handleStart}
                disabled={!targetRole.trim() || starting}
              >
                {starting ? 'Generating questions...' : 'Start Interview →'}
              </button>

            </div>

            {error && (
              <div className="interview-error-message">
                {error}
              </div>
            )}

          </div>

        </div>
      )}


      {/* Progress */}

      {started && (
        <div className="interview-progress-card">

          <div className="interview-progress-header">

            <div>
              <span className="card-eyebrow">
                INTERVIEW PROGRESS
              </span>

              <h2>
                {completed
                  ? `Completed ${questions.length} of ${questions.length}`
                  : `Question ${questionNumber} of ${questions.length}`}
              </h2>
            </div>

            <strong>
              {completed ? 100 : Math.round(progress)}%
            </strong>

          </div>


          <div className="interview-progress-bar">

            <div
              className="interview-progress-fill"
              style={{
                width: `${completed ? 100 : progress}%`
              }}
            ></div>

          </div>

        </div>
      )}


      {/* Interview */}

      {started && !completed && (
        <div className="interview-question-card">

          <div className="interview-question-header">

            <div className="ai-avatar">
              AI
            </div>

            <div>
              <span>
                AI INTERVIEWER
              </span>

              <strong>
                {targetRole} Interview
              </strong>
            </div>

          </div>


          <div className="question-content">

            <span className="question-number">
              QUESTION {String(questionNumber).padStart(2, '0')}
              {currentQuestion.difficulty &&
                ` · ${currentQuestion.difficulty.toUpperCase()}`}
            </span>

            <h2>
              {currentQuestion.question}
            </h2>

          </div>


          {/* Answer */}

          <div className="answer-area">

            <label>
              YOUR ANSWER
            </label>

            <textarea
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Type your answer here..."
              maxLength={5000}
              disabled={submitted || evaluating}
            />

            <div className="answer-footer">

              <span>
                {answer.length} / 5000 characters
              </span>

              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={!answer.trim() || evaluating}
                >
                  {evaluating ? 'Evaluating...' : 'Submit Answer ✓'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                >
                  {questionNumber === questions.length
                    ? 'Finish Interview ✓'
                    : 'Next Question →'}
                </button>
              )}

            </div>

            {error && (
              <div className="interview-error-message">
                {error}
              </div>
            )}

            {submitted && currentResult && (
              <div className="interview-feedback-card">

                <div className="interview-feedback-header">
                  <span className="card-eyebrow">
                    AI EVALUATION
                  </span>

                  <strong className="interview-feedback-score">
                    {currentResult.score.toFixed(1)} / 10
                  </strong>
                </div>

                {currentResult.feedback && (
                  <p>{currentResult.feedback}</p>
                )}

                {currentResult.strengths.length > 0 && (
                  <div className="interview-feedback-section">
                    <strong>Strengths</strong>
                    <ul>
                      {currentResult.strengths.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentResult.improvements.length > 0 && (
                  <div className="interview-feedback-section">
                    <strong>Improvements</strong>
                    <ul>
                      {currentResult.improvements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>
      )}


      {/* Completed */}

      {started && completed && (
        <div className="interview-complete-card">

          <div className="interview-complete-icon">
            ✓
          </div>

          <span className="card-eyebrow">
            INTERVIEW COMPLETED
          </span>

          <h2>
            Overall score: {averageScore.toFixed(1)} / 10
          </h2>

          <p>
            You answered {results.length} of {questions.length} questions
            for the {targetRole} role.
          </p>

          <div className="interview-summary-list">
            {questions.map((item, index) => (
              <div className="interview-summary-item" key={index}>
                <span>
                  {index + 1}. {item.question}
                </span>
                <strong>
                  {results[index]
                    ? `${results[index].score.toFixed(1)} / 10`
                    : '—'}
                </strong>
              </div>
            ))}
          </div>

          <button onClick={handleRestart}>
            Practice Again
          </button>

        </div>
      )}


      {/* Information Cards */}

      <div className="interview-info-grid">

        <div className="interview-info-card">

          <div className="info-card-icon">
            💡
          </div>

          <div>
            <strong>Interview Tip</strong>

            <p>
              Be specific and use examples from your projects
              when answering technical questions.
            </p>
          </div>

        </div>


        <div className="interview-info-card">

          <div className="info-card-icon">
            AI
          </div>

          <div>
            <strong>What is evaluated?</strong>

            <p>
              Each answer is scored for technical correctness,
              understanding, clarity and practical knowledge.
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Interview
