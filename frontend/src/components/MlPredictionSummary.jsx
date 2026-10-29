import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function getToken() {
  return localStorage.getItem('token')
}

// Compact version of the prediction for the Dashboard.
// Reuses the readiness-card classes, so it needs no new CSS.
function MlPredictionSummary({ onView }) {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadPrediction() {
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
  }, [])

  const prediction = result && result.prediction
  const percent = prediction
    ? Math.round((Number(prediction.placementReadyProbability) || 0) * 100)
    : 0
  const remaining = 100 - percent
  const assumed = (result && result.assumedInputs) || []

  let summary = ''

  if (loading) {
    summary = 'Running your prediction...'
  } else if (error) {
    summary = error
  } else if (!prediction) {
    summary =
      'Add your academic details and practice hours to get a placement prediction.'
  } else if (assumed.length > 0) {
    summary = `Estimated without real data for ${assumed
      .map((item) => item.label.toLowerCase())
      .join(' and ')}. Add it for a more accurate result.`
  } else {
    summary = 'Estimated from your academics, skills, resume and mock interviews.'
  }
  const LABEL_COLORS = {
  'Placement Ready': { color: '#4ade80', background: 'rgba(74, 222, 128, 0.12)' },
  'Needs Improvement': { color: '#fbbf24', background: 'rgba(251, 191, 36, 0.12)' },
  'Not Ready': { color: '#f87171', background: 'rgba(248, 113, 113, 0.12)' }
}

  return (
    <div className="readiness-card">
      <div className="readiness-card-header">
        <div>
          <span className="card-eyebrow">AI PREDICTION</span>
          <h3>Placement Prediction</h3>
        </div>

        {prediction && (
  <span
    className="readiness-label"
    style={LABEL_COLORS[prediction.predictedClass]}
  >
    {prediction.predictedClass}
  </span>
)}
      </div>

      <div className="readiness-main">
        <div className="readiness-score-circle">
          <strong>{prediction ? `${percent}%` : '--'}</strong>
          <span>Ready</span>
        </div>

        <div className="readiness-summary">
          <p>{summary}</p>

          {prediction && (
            <>
              <div className="readiness-bar">
                <div
                  className="readiness-bar-fill"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              <span className="readiness-target">
                {remaining > 0
                  ? `${remaining}% improvement needed`
                  : 'Fully ready'}
              </span>
            </>
          )}
        </div>
      </div>

      <button className="readiness-view-button" onClick={onView}>
        {prediction ? 'Update My Details →' : 'Add My Details →'}
      </button>
    </div>
  )
}

export default MlPredictionSummary
