import { useEffect, useState } from 'react'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001'

function getToken() {
  return localStorage.getItem('token')
}

async function apiRequest(path, method = 'GET', body) {
  const response = await fetch(`${API_URL}/api/roadmap${path}`, {
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

function LearningRoadmap() {
  const [roadmap, setRoadmap] = useState(null)
  const [targetRole, setTargetRole] = useState('')
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [updatingId, setUpdatingId] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadRoadmap() {
      try {
        const data = await apiRequest('/latest')
        setRoadmap(data.roadmap)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadRoadmap()
  }, [])

  async function handleGenerate() {
    if (!targetRole.trim() || generating) return

    setError('')
    setGenerating(true)

    try {
      const data = await apiRequest('/', 'POST', {
        targetRole: targetRole.trim()
      })

      setRoadmap(data.roadmap)
      setTargetRole('')
    } catch (err) {
      setError(
        err.message === 'Resume not found'
          ? 'Please analyze your resume first, then generate your roadmap.'
          : err.message
      )
    } finally {
      setGenerating(false)
    }
  }

  async function handleComplete(phaseId) {
    if (updatingId) return

    setError('')
    setUpdatingId(phaseId)

    try {
      const data = await apiRequest(
        `/${roadmap._id}/phases/${phaseId}`,
        'PATCH',
        { status: 'completed' }
      )

      setRoadmap(data.roadmap)
    } catch (err) {
      setError(err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  function handleNewRoadmap() {
    setRoadmap(null)
    setError('')
  }

  const phases = roadmap ? roadmap.phases : []

  const completedTopics = phases.filter(
    (item) => item.status === 'completed'
  ).length

  const progress = phases.length
    ? Math.round((completedTopics / phases.length) * 100)
    : 0

  return (
    <div className="roadmap-page">

      {/* Header */}

      <div className="page-header">

        <span className="card-eyebrow">
          CAREER DEVELOPMENT
        </span>

        <h1>Learning Roadmap</h1>

        <p>
          Follow a personalized learning path based on your
          resume and target role.
        </p>

      </div>


      {/* Loading */}

      {loading && (
        <div className="roadmap-setup-card">
          <p className="roadmap-setup-hint">
            Loading your roadmap...
          </p>
        </div>
      )}


      {/* Setup */}

      {!loading && !roadmap && (
        <div className="roadmap-setup-card">

          <span className="card-eyebrow">
            GENERATE ROADMAP
          </span>

          <h2>What role are you preparing for?</h2>

          <p className="roadmap-setup-hint">
            We'll build a phase-by-phase plan from your resume.
          </p>

          <input
            className="roadmap-role-input"
            type="text"
            value={targetRole}
            onChange={(event) => setTargetRole(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleGenerate()
            }}
            placeholder="e.g. Backend Developer"
            disabled={generating}
          />

          <button
            className="roadmap-action"
            onClick={handleGenerate}
            disabled={!targetRole.trim() || generating}
          >
            {generating ? 'Generating roadmap...' : 'Generate Roadmap →'}
          </button>

          {error && (
            <div className="roadmap-error-message">
              {error}
            </div>
          )}

        </div>
      )}


      {/* Roadmap */}

      {!loading && roadmap && (
        <>

          {/* Progress */}

          <div className="roadmap-progress-card">

            <div className="roadmap-progress-header">

              <div>
                <span className="card-eyebrow">
                  YOUR PROGRESS
                </span>

                <h2>
                  {roadmap.targetRole} Roadmap
                </h2>

                <p>
                  {completedTopics} of {phases.length} phases
                  completed
                  {roadmap.currentLevel
                    ? ` · Starting level: ${roadmap.currentLevel}`
                    : ''}
                </p>
              </div>

              <strong>
                {progress}%
              </strong>

            </div>


            <div className="roadmap-progress-bar">

              <div
                className="roadmap-progress-fill"
                style={{
                  width: `${progress}%`
                }}
              ></div>

            </div>

            <button
              className="roadmap-secondary-button"
              onClick={handleNewRoadmap}
            >
              Generate a new roadmap
            </button>

          </div>

          {error && (
            <div className="roadmap-error-message">
              {error}
            </div>
          )}


          {/* Phases */}

          <div className="roadmap-container">

            {phases.map((item, index) => (

              <div
                className={`roadmap-step ${item.status}`}
                key={item._id}
              >

                {/* Timeline */}

                <div className="roadmap-timeline">

                  <div className="roadmap-node">

                    {item.status === 'completed'
                      ? '✓'
                      : String(index + 1).padStart(2, '0')}

                  </div>

                  {index !== phases.length - 1 && (
                    <div className="roadmap-line"></div>
                  )}

                </div>


                {/* Content */}

                <div className="roadmap-step-card">

                  <div className="roadmap-step-top">

                    <div>

                      <span className="roadmap-status">
                        {item.status === 'completed'
                          ? 'COMPLETED'
                          : item.status === 'current'
                            ? 'CURRENT'
                            : 'UPCOMING'}
                      </span>

                      <h3>
                        {item.title}
                      </h3>

                    </div>

                    <span className="roadmap-time">
                      {item.duration}
                    </span>

                  </div>


                  {item.skills && item.skills.length > 0 && (
                    <div className="roadmap-skills">
                      {item.skills.map((skill, skillIndex) => (
                        <span key={skillIndex}>{skill}</span>
                      ))}
                    </div>
                  )}


                  {item.tasks && item.tasks.length > 0 && (
                    <div className="roadmap-tasks">
                      <strong>Tasks</strong>
                      <ul>
                        {item.tasks.map((task, taskIndex) => (
                          <li key={taskIndex}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  )}


                  {item.status === 'current' && (
                    <button
                      className="roadmap-action"
                      onClick={() => handleComplete(item._id)}
                      disabled={updatingId === item._id}
                    >
                      {updatingId === item._id
                        ? 'Saving...'
                        : 'Mark as Completed ✓'}
                    </button>
                  )}

                </div>

              </div>

            ))}

          </div>

        </>
      )}

    </div>
  )
}

export default LearningRoadmap
