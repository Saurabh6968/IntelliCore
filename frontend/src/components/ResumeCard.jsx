function ResumeCard() {
  return (
    <div className="resume-card">

      <div className="resume-card-header">
        <div>
          <span className="card-eyebrow">RESUME HEALTH</span>
          <h3>Resume Analysis</h3>
          <p>Your latest resume analysis is ready.</p>
        </div>

        <div className="resume-status">
          <span className="status-dot"></span>
          Analyzed
        </div>
      </div>

      <div className="resume-metrics">

        <div className="resume-metric">
          <span>Resume Score</span>
          <strong>82%</strong>
        </div>

        <div className="resume-metric">
          <span>ATS Compatibility</span>
          <strong>85%</strong>
        </div>

        <div className="resume-metric">
          <span>Last Analyzed</span>
          <strong>Today</strong>
        </div>

      </div>

      <button className="resume-view-button">
        View Full Analysis →
      </button>

    </div>
  )
}

export default ResumeCard