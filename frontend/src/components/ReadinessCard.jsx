function ReadinessCard({ data, onView }) {
  const remaining = 100 - data.overallScore

  return (
    <div className="readiness-card">

      <div className="readiness-card-header">
        <div>
          <span className="card-eyebrow">PLACEMENT STATUS</span>
          <h3>Placement Readiness</h3>
        </div>

        <span className="readiness-label">
          {data.status}
        </span>
      </div>

      <div className="readiness-main">

        <div className="readiness-score-circle">
          <strong>{data.overallScore}%</strong>
          <span>Ready</span>
        </div>

        <div className="readiness-summary">
          <p>{data.summary}</p>

          <div className="readiness-bar">
            <div
              className="readiness-bar-fill"
              style={{ width: `${data.overallScore}%` }}
            ></div>
          </div>

          <span className="readiness-target">
            {remaining > 0
              ? `${remaining}% improvement needed`
              : 'Fully ready'}
          </span>
        </div>

      </div>

      <button className="readiness-view-button" onClick={onView}>
        View Readiness Report →
      </button>

    </div>
  )
}

export default ReadinessCard
