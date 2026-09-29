function SkillGap() {
  return (
    <div className="skill-gap-card">

      <div className="dashboard-card-header">
        <div>
          <span className="card-eyebrow">SKILL ANALYSIS</span>
          <h3>Skill Gap</h3>
          <p>Areas that need your attention.</p>
        </div>

        <div className="skill-match-score">
          <strong>74%</strong>
          <span>Match</span>
        </div>
      </div>

      <div className="skill-list">

        <div className="skill-row">
          <div className="skill-info">
            <span>Data Structures</span>
            <small>Needs Improvement</small>
          </div>

          <div className="skill-progress">
            <div
              className="skill-progress-fill danger"
              style={{ width: '45%' }}
            ></div>
          </div>

          <strong>45%</strong>
        </div>

        <div className="skill-row">
          <div className="skill-info">
            <span>React.js</span>
            <small>Intermediate</small>
          </div>

          <div className="skill-progress">
            <div
              className="skill-progress-fill warning"
              style={{ width: '68%' }}
            ></div>
          </div>

          <strong>68%</strong>
        </div>

        <div className="skill-row">
          <div className="skill-info">
            <span>Machine Learning</span>
            <small>Needs Improvement</small>
          </div>

          <div className="skill-progress">
            <div
              className="skill-progress-fill danger"
              style={{ width: '42%' }}
            ></div>
          </div>

          <strong>42%</strong>
        </div>

        <div className="skill-row">
          <div className="skill-info">
            <span>Python</span>
            <small>Good</small>
          </div>

          <div className="skill-progress">
            <div
              className="skill-progress-fill success"
              style={{ width: '82%' }}
            ></div>
          </div>

          <strong>82%</strong>
        </div>

      </div>

      <button className="dashboard-link-button">
        View Full Skill Analysis →
      </button>

    </div>
  )
}

export default SkillGap