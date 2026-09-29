import { useState } from 'react'

function Interview() {
  const [answer, setAnswer] = useState('')
  const [questionNumber, setQuestionNumber] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [completed, setCompleted] = useState(false)

  const questions = [
    'Tell me about yourself.',
    'What are your strongest technical skills?',
    'Explain a challenging project you have worked on.',
    'Why should we hire you?',
    'Where do you see yourself in the next five years?'
  ]

  const progress =
    (questionNumber / questions.length) * 100

  function handleSubmit() {
    if (!answer.trim()) return

    setSubmitted(true)
  }

  function handleNext() {
    if (questionNumber < questions.length) {
      setQuestionNumber(questionNumber + 1)
      setAnswer('')
      setSubmitted(false)
    } else {
      setCompleted(true)
    }
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


      {/* Progress */}

      <div className="interview-progress-card">

        <div className="interview-progress-header">

          <div>
            <span className="card-eyebrow">
              INTERVIEW PROGRESS
            </span>

            <h2>
              Question {questionNumber} of {questions.length}
            </h2>
          </div>

          <strong>
            {Math.round(progress)}%
          </strong>

        </div>


        <div className="interview-progress-bar">

          <div
            className="interview-progress-fill"
            style={{
              width: `${progress}%`
            }}
          ></div>

        </div>

      </div>


      {/* Interview */}

      {!completed ? (
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
                Technical & HR Interview
              </strong>
            </div>

          </div>


          <div className="question-content">

            <span className="question-number">
              QUESTION {String(questionNumber).padStart(2, '0')}
            </span>

            <h2>
              {questions[questionNumber - 1]}
            </h2>

          </div>


          {/* Answer */}

          <div className="answer-area">

            <label>
              YOUR ANSWER
            </label>

            <textarea
              value={answer}
              onChange={(event) => {
                setAnswer(event.target.value)
                setSubmitted(false)
              }}
              placeholder="Type your answer here..."
              disabled={submitted}
            />

            <div className="answer-footer">

              <span>
                {answer.length} characters
              </span>

              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={!answer.trim()}
                >
                  Submit Answer ✓
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

            {submitted && (
              <div className="answer-submitted-message">
                ✓ Answer submitted successfully.
              </div>
            )}

          </div>

        </div>
      ) : (
        <div className="interview-complete-card">

          <div className="interview-complete-icon">
            ✓
          </div>

          <span className="card-eyebrow">
            INTERVIEW COMPLETED
          </span>

          <h2>
            Great work!
          </h2>

          <p>
            You have completed all interview questions.
            Detailed AI evaluation and feedback will be
            connected during backend integration.
          </p>

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
              Your answers can later be evaluated for
              communication, relevance and technical depth.
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Interview