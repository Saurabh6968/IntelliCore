function InterviewCard({ stats, onStart }) {
  return (
    <div className="interview-card">

      <div className="interview-card-header">
        <div>
          <span className="card-eyebrow">AI PRACTICE</span>
          <h3>AI Interview Practice</h3>
          <p>
            Practice role-specific questions and improve your interview skills.
          </p>
        </div>

        <div className="interview-icon">
          ✦
        </div>
      </div>

      <div className="interview-stats">

        <div>
          <strong>{stats.answered}</strong>
          <span>Answered</span>
        </div>

        <div>
          <strong>{stats.sessions}</strong>
          <span>Sessions</span>
        </div>

        <div>
          <strong>
            {stats.average === null ? '—' : `${stats.average}%`}
          </strong>
          <span>Avg. Score</span>
        </div>

      </div>

      <button className="interview-start-button" onClick={onStart}>
        {stats.sessions > 0 ? 'Start Interview →' : 'Take Your First Interview →'}
      </button>

    </div>
  )
}

export default InterviewCard
