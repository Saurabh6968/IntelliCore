import { useEffect, useState } from 'react'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001'

function getToken() {
  return localStorage.getItem('token')
}

function Readiness() {
  const [readiness, setReadiness] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadReadiness() {
      try {
        const response = await fetch(
          `${API_URL}/api/placement-readiness`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          }
        )

        const data = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong')
        }

        setReadiness(data.readiness)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadReadiness()
  }, [])

  return (
    <div className="readiness-page">

      {/* Header */}

      <div className="page-header">

        <span className="card-eyebrow">
          PLACEMENT INTELLIGENCE
        </span>

        <h1>Placement Readiness</h1>

        <p>
          Understand your current preparation level and identify
          what you should improve before placement.
        </p>

      </div>


      {loading && (
        <div className="readiness-state-card">
          Calculating your readiness...
        </div>
      )}

      {!loading && error && (
        <div className="readiness-error-message">
          {error}
        </div>
      )}


      {!loading && readiness && (
        <>

          {/* Overall Readiness */}

          <div className="readiness-overview">

            <div className="readiness-score-section">

              <span className="card-eyebrow">
                OVERALL READINESS
              </span>

              <div className="readiness-big-score">
                {readiness.overallScore}%
              </div>

              <span
                className={`readiness-status status-${readiness.status
                  .toLowerCase()
                  .replace(' ', '-')}`}
              >
                {readiness.status}
              </span>

              <p>
                {readiness.summary}
              </p>

            </div>


            <div className="readiness-progress-section">

              <div className="readiness-progress-top">
                <span>Placement Readiness</span>
                <strong>{readiness.overallScore} / 100</strong>
              </div>

              <div className="readiness-large-bar">

                <div
                  className="readiness-large-fill"
                  style={{ width: `${readiness.overallScore}%` }}
                ></div>

              </div>

              <div className="readiness-scale">
                <span>Needs Work</span>
                <span>Developing</span>
                <span>Ready</span>
              </div>

            </div>

          </div>


          {/* Breakdown */}

          <div className="readiness-breakdown">

            <div className="readiness-section-header">

              <div>
                <span className="card-eyebrow">
                  READINESS BREAKDOWN
                </span>

                <h2>Performance Areas</h2>

                <p>
                  Calculated from your resume, skill gap, interviews
                  and roadmap progress ({readiness.startedCount} of{' '}
                  {readiness.totalCount} areas started).
                </p>
              </div>

            </div>


            <div className="readiness-category-list">

              {readiness.categories.map((category) => (

                <div
                  className="readiness-category"
                  key={category.key}
                >

                  <div className="readiness-category-top">

                    <span>
                      {category.name}
                      <small className="readiness-weight">
                        {category.weight}% of score
                      </small>
                    </span>

                    {category.score === null ? (
                      <strong className="readiness-not-started">
                        Not started
                      </strong>
                    ) : (
                      <strong>
                        {category.score}%
                      </strong>
                    )}

                  </div>

                  <div className="readiness-category-bar">

                    <div
                      className="readiness-category-fill"
                      style={{
                        width: `${category.score ?? 0}%`
                      }}
                    ></div>

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* Improvement Areas */}

          <div className="readiness-improvements">

            <div className="readiness-section-header">

              <div>
                <span className="card-eyebrow">
                  RECOMMENDED ACTIONS
                </span>

                <h2>Areas to Improve</h2>

                <p>
                  Your lowest-scoring areas. Focus on these to raise
                  your readiness score.
                </p>
              </div>

            </div>


            <div className="improvement-grid">

              {readiness.improvements.map((item, index) => (

                <div
                  className="improvement-card"
                  key={item.key}
                >

                  <span className="improvement-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </>
      )}

    </div>
  )
}

export default Readiness
