function formatDate(value) {
  if (!value) return '—'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return '—'

  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

function percent(value) {
  return value === null || value === undefined ? '—' : `${value}%`
}

function ResumeCard({ resume, onView }) {
  return (
    <div className="resume-card">

      <div className="resume-card-header">
        <div>
          <span className="card-eyebrow">RESUME HEALTH</span>
          <h3>Resume Analysis</h3>
          <p>
            {resume.analyzed
              ? 'Your latest resume analysis is ready.'
              : 'Upload your resume to get an ATS analysis.'}
          </p>
        </div>

        <div className="resume-status">
          <span className="status-dot"></span>
          {resume.analyzed ? 'Analyzed' : 'Not analyzed'}
        </div>
      </div>

      <div className="resume-metrics">

        <div className="resume-metric">
          <span>Resume Score</span>
          <strong>{percent(resume.resumeScore)}</strong>
        </div>

        <div className="resume-metric">
          <span>ATS Compatibility</span>
          <strong>{percent(resume.atsScore)}</strong>
        </div>

        <div className="resume-metric">
          <span>Last Analyzed</span>
          <strong>{formatDate(resume.lastAnalyzed)}</strong>
        </div>

      </div>

      <button className="resume-view-button" onClick={onView}>
        {resume.analyzed ? 'View Full Analysis →' : 'Analyze Resume →'}
      </button>

    </div>
  )
}

export default ResumeCard
