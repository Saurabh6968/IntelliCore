import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

const CLASS_ORDER = ['Placement Ready', 'Needs Improvement', 'Not Ready']

function getToken() {
  return localStorage.getItem('token')
}

function toPercent(value) {
  return Math.round((Number(value) || 0) * 100)
}

function MlPredictionCard({ refreshKey = 0, onEditProfile }) {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadPrediction() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`${API_URL}/api/ml-prediction`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })

        const data = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong')
        }

        if (!cancelled) setResult(data)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadPrediction()

    return () => {
      cancelled = true
    }
  }, [refreshKey])

  if (loading) {
    return <div className="ml-card ml-card-note">Running your prediction...</div>
  }

  if (error) {
    return <div className="ml-card ml-card-error">{error}</div>
  }

  if (!result || !result.profileComplete || !result.prediction) {
    return (
      <div className="ml-card ml-card-note">
        Save your placement details to see your prediction.
      </div>
    )
  }

  const { predictedClass, placementReadyProbability, probabilities } =
    result.prediction

  const rows = CLASS_ORDER.filter((name) => name in (probabilities || {}))
  const assumed = result.assumedInputs || []

  return (
    <div className="ml-card">
      <div className="ml-card-head">
        <div>
          <p className="ml-card-label">Predicted status</p>
          <h2 className="ml-card-class">{predictedClass}</h2>
        </div>

        <div className="ml-card-score">
          <span className="ml-card-score-value">
            {toPercent(placementReadyProbability)}%
          </span>
          <span className="ml-card-score-label">chance of being placement ready</span>
        </div>
      </div>

      <div className="ml-bars">
        {rows.map((name) => {
          const percent = toPercent(probabilities[name])

          return (
            <div className="ml-bar-row" key={name}>
              <span className="ml-bar-name">{name}</span>
              <div
                className="ml-bar-track"
                role="img"
                aria-label={`${name}: ${percent}%`}
              >
                <div
                  className={`ml-bar-fill ${
                    name === predictedClass ? 'ml-bar-fill-top' : ''
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="ml-bar-value">{percent}%</span>
            </div>
          )
        })}
      </div>

      {assumed.length > 0 && (
        <p className="ml-assumed">
          No data found for {assumed.map((item) => item.label.toLowerCase()).join(' and ')}, so
          we used {assumed.map((item) => item.value).join(' and ')} as a placeholder. Add real
          data for a more accurate result.
        </p>
      )}

      {onEditProfile && (
        <button type="button" className="ml-link-button" onClick={onEditProfile}>
          Update my details
        </button>
      )}
    </div>
  )
}

export default MlPredictionCard
