import { useEffect, useRef, useState } from 'react'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001'

function getToken() {
  return localStorage.getItem('token')
}

async function chatRequest(method = 'GET', body) {
  const response = await fetch(`${API_URL}/api/career-chat`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: body ? JSON.stringify(body) : undefined
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

function CareerGuidance() {
  const careerPaths = [
    {
      title: 'AI / ML Engineer',
      match: 82,
      description:
        'Build machine learning models and AI-powered applications.'
    },
    {
      title: 'Data Analyst',
      match: 76,
      description:
        'Work with data, SQL, visualization and business insights.'
    },
    {
      title: 'Software Developer',
      match: 71,
      description:
        'Build software applications using programming and web technologies.'
    }
  ]

  const recommendations = [
    'Strengthen Data Structures and Algorithms',
    'Improve Machine Learning fundamentals',
    'Build 2–3 role-specific projects',
    'Practice technical and HR interviews'
  ]

  const starterQuestions = [
    'What should I focus on first for placements?',
    'How do I choose between these career paths?',
    'How can I improve my resume for my target role?'
  ]

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loadingHistory, setLoadingHistory] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const chatRef = useRef(null)
  const messagesRef = useRef(null)

  useEffect(() => {
    async function loadChat() {
      try {
        const data = await chatRequest()
        setMessages(data.messages || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoadingHistory(false)
      }
    }

    loadChat()
  }, [])

  // Keep the newest message in view (scrolls the chat box only)
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, sending])

  async function sendMessage(text) {
    const message = text.trim()

    if (!message || sending) return

    setError('')
    setSending(true)

    // Show the question immediately while the AI answers
    setMessages((prev) => [...prev, { role: 'user', content: message }])
    setInput('')

    try {
      const data = await chatRequest('POST', { message })
      setMessages(data.messages)
    } catch (err) {
      setError(err.message)
      // Remove the unsent question so it can be retried
      setMessages((prev) => prev.slice(0, -1))
      setInput(message)
    } finally {
      setSending(false)
    }
  }

  function askAbout(text) {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    sendMessage(text)
  }

  async function handleClear() {
    if (sending) return

    setError('')

    try {
      const data = await chatRequest('DELETE')
      setMessages(data.messages || [])
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="career-page">

      <div className="page-header">
        <span className="card-eyebrow">
          CAREER INTELLIGENCE
        </span>

        <h1>Career Guidance</h1>

        <p>
          Explore career paths and get personalized recommendations
          based on your current skills and placement profile.
        </p>
      </div>


      {/* Career Profile */}

      <div className="career-profile">

        <div>
          <span className="card-eyebrow">
            YOUR CAREER PROFILE
          </span>

          <h2>Current Career Direction</h2>

          <p>
            Based on your current skills, resume and learning progress.
          </p>
        </div>

        <div className="career-profile-details">

          <div>
            <span>Target Role</span>
            <strong>AI / ML Engineer</strong>
          </div>

          <div>
            <span>Experience Level</span>
            <strong>Student / Fresher</strong>
          </div>

          <div>
            <span>Skill Match</span>
            <strong>74%</strong>
          </div>

        </div>

      </div>


      {/* Career Paths */}

      <div className="career-section">

        <div className="career-section-header">

          <div>
            <span className="card-eyebrow">
              RECOMMENDED PATHS
            </span>

            <h2>Career Options</h2>

            <p>
              Career paths aligned with your current profile.
            </p>
          </div>

        </div>


        <div className="career-path-grid">

          {careerPaths.map((career) => (

            <div
              className="career-path-card"
              key={career.title}
            >

              <div className="career-path-top">

                <div className="career-path-icon">
                  ✦
                </div>

                <span className="career-match">
                  {career.match}% Match
                </span>

              </div>

              <h3>
                {career.title}
              </h3>

              <p>
                {career.description}
              </p>

              <div className="career-match-bar">

                <div
                  className="career-match-fill"
                  style={{
                    width: `${career.match}%`
                  }}
                ></div>

              </div>

              <button
                className="career-explore-button"
                onClick={() =>
                  askAbout(
                    `Tell me about the ${career.title} career path and how I can prepare for it.`
                  )
                }
                disabled={sending}
              >
                Explore Path →
              </button>

            </div>

          ))}

        </div>

      </div>


      {/* AI Advice */}

      <div className="career-advice">

        <div className="career-advice-header">

          <div className="career-ai-icon">
            AI
          </div>

          <div>
            <span className="card-eyebrow">
              AI CAREER ADVICE
            </span>

            <h2>Your Recommended Next Steps</h2>

            <p>
              Focus on these areas to move closer to your target career.
              Click one to ask the advisor how.
            </p>
          </div>

        </div>


        <div className="career-recommendations">

          {recommendations.map((recommendation, index) => (

            <button
              className="career-recommendation career-recommendation-button"
              key={recommendation}
              onClick={() =>
                askAbout(`How do I do this: ${recommendation}?`)
              }
              disabled={sending}
            >

              <span>
                {String(index + 1).padStart(2, '0')}
              </span>

              <strong>
                {recommendation}
              </strong>

            </button>

          ))}

        </div>

      </div>


      {/* AI Career Advisor Chat */}

      <div className="career-chat" ref={chatRef}>

        <div className="career-chat-header">

          <div>
            <span className="card-eyebrow">
              AI CAREER ADVISOR
            </span>

            <h2>Ask Anything About Your Career</h2>

            <p>
              Get practical advice on skills, interviews, learning
              paths and placements, based on your resume.
            </p>
          </div>

          {messages.length > 0 && (
            <button
              className="career-chat-clear"
              onClick={handleClear}
              disabled={sending}
            >
              Clear chat
            </button>
          )}

        </div>


        <div className="career-chat-messages" ref={messagesRef}>

          {loadingHistory && (
            <p className="career-chat-empty">
              Loading your conversation...
            </p>
          )}

          {!loadingHistory && messages.length === 0 && !sending && (
            <div className="career-chat-empty">

              <p>
                No messages yet. Try one of these:
              </p>

              <div className="career-chat-starters">
                {starterQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => sendMessage(question)}
                    disabled={sending}
                  >
                    {question}
                  </button>
                ))}
              </div>

            </div>
          )}

          {messages.map((item, index) => (
            <div
              className={`career-chat-message ${item.role}`}
              key={index}
            >
              <span className="career-chat-author">
                {item.role === 'user' ? 'YOU' : 'AI ADVISOR'}
              </span>

              <div className="career-chat-bubble">
                {item.content}
              </div>
            </div>
          ))}

          {sending && (
            <div className="career-chat-message assistant">
              <span className="career-chat-author">
                AI ADVISOR
              </span>

              <div className="career-chat-bubble career-chat-typing">
                Thinking...
              </div>
            </div>
          )}

        </div>


        {error && (
          <div className="career-chat-error">
            {error}
          </div>
        )}


        <div className="career-chat-input-row">

          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') sendMessage(input)
            }}
            placeholder="Ask a career question..."
            maxLength={2000}
            disabled={sending}
          />

          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || sending}
          >
            {sending ? 'Sending...' : 'Send →'}
          </button>

        </div>

      </div>

    </div>
  )
}

export default CareerGuidance
