function SkillGap({ data, onView }) {
  return (
    <div className="skill-gap-card">

      <div className="dashboard-card-header">
        <div>
          <span className="card-eyebrow">SKILL ANALYSIS</span>
          <h3>Skill Gap</h3>
          <p>
            {data
              ? `Target role: ${data.targetRole}`
              : 'Areas that need your attention.'}
          </p>
        </div>

        <div className="skill-match-score">
          <strong>
            {data && data.matchScore !== null ? `${data.matchScore}%` : '—'}
          </strong>
          <span>Match</span>
        </div>
      </div>

      <div className="skill-list">

        {!data && (
          <p className="dashboard-empty">
            No skill gap analysis yet. Run one for your target role.
          </p>
        )}

        {data &&
          data.skills.map((skill) => (
            <div className="skill-row" key={skill.name}>
              <div className="skill-info">
                <span>{skill.name}</span>
                <small>{skill.have ? 'You have this' : 'Needs Improvement'}</small>
              </div>

              <div className="skill-progress">
                <div
                  className={`skill-progress-fill ${
                    skill.have ? 'success' : 'danger'
                  }`}
                  style={{ width: skill.have ? '100%' : '0%' }}
                ></div>
              </div>

              <strong>{skill.have ? 'Have' : 'Missing'}</strong>
            </div>
          ))}

      </div>

      <button className="dashboard-link-button" onClick={onView}>
        {data ? 'View Full Skill Analysis →' : 'Run Skill Analysis →'}
      </button>

    </div>
  )
}

export default SkillGap
