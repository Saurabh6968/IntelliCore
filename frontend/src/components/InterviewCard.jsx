function InterviewCard() {
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
          <strong>12</strong>
          <span>Questions</span>
        </div>

        <div>
          <strong>3</strong>
          <span>Sessions</span>
        </div>

        <div>
          <strong>76%</strong>
          <span>Avg. Score</span>
        </div>

      </div>

      <button className="interview-start-button">
        Start Interview →
      </button>

    </div>
  )
}

export default InterviewCard