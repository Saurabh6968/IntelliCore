function ReadinessCard() {
  return (
    <div className="readiness-card">

      <div className="readiness-card-header">
        <div>
          <span className="card-eyebrow">PLACEMENT STATUS</span>
          <h3>Placement Readiness</h3>
        </div>

        <span className="readiness-label">
          Good Progress
        </span>
      </div>

      <div className="readiness-main">

        <div className="readiness-score-circle">
          <strong>68%</strong>
          <span>Ready</span>
        </div>

        <div className="readiness-summary">
          <p>
            Your readiness is based on your resume, skills and interview
            performance.
          </p>

          <div className="readiness-bar">
            <div
              className="readiness-bar-fill"
              style={{ width: '68%' }}
            ></div>
          </div>

          <span className="readiness-target">
            32% improvement needed
          </span>
        </div>

      </div>

      <button className="readiness-view-button">
        View Readiness Report →
      </button>

    </div>
  )
}

export default ReadinessCard