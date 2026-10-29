const STATUS_LABELS = {
  completed: { text: 'Completed', className: 'completed-status' },
  current: { text: 'In Progress', className: 'current-status' },
  upcoming: { text: 'Upcoming', className: 'upcoming-status' }
}

function LearningRoadmap({ data, onView }) {
  return (
    <div className="roadmap-card">

      <div className="dashboard-card-header">
        <div>
          <span className="card-eyebrow">YOUR PLAN</span>
          <h3>Learning Roadmap</h3>
          <p>
            {data
              ? `Path to ${data.targetRole}`
              : 'Your personalized path to placement readiness.'}
          </p>
        </div>

        <div className="roadmap-progress">
          <strong>{data ? `${data.progress}%` : '—'}</strong>
          <span>Complete</span>
        </div>
      </div>

      <div className="roadmap-timeline">

        {!data && (
          <p className="dashboard-empty">
            No roadmap yet. Generate one for your target role.
          </p>
        )}

        {data &&
          data.phases.map((phase) => {
            const label =
              STATUS_LABELS[phase.status] || STATUS_LABELS.upcoming

            const stepClass =
              phase.status === 'completed' || phase.status === 'current'
                ? phase.status
                : ''

            return (
              <div
                className={`roadmap-step ${stepClass}`}
                key={phase.number}
              >

                <div className="timeline-marker">
                  {phase.status === 'completed' ? '✓' : phase.number}
                </div>

                <div className="timeline-content">
                  <div className="roadmap-step-top">
                    <div>
                      <span className="step-label">
                        STEP {String(phase.number).padStart(2, '0')}
                      </span>
                      <h4>{phase.title}</h4>
                    </div>

                    <span className={`roadmap-status ${label.className}`}>
                      {label.text}
                    </span>
                  </div>

                  {phase.description && <p>{phase.description}</p>}
                </div>

              </div>
            )
          })}

      </div>

      <button className="dashboard-link-button" onClick={onView}>
        {data ? 'View Full Roadmap →' : 'Generate Roadmap →'}
      </button>

    </div>
  )
}

export default LearningRoadmap
