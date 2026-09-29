function LearningRoadmap() {
  return (
    <div className="roadmap-card">

      <div className="dashboard-card-header">
        <div>
          <span className="card-eyebrow">YOUR PLAN</span>
          <h3>Learning Roadmap</h3>
          <p>Your personalized path to placement readiness.</p>
        </div>

        <div className="roadmap-progress">
          <strong>33%</strong>
          <span>Complete</span>
        </div>
      </div>

      <div className="roadmap-timeline">

        <div className="roadmap-step completed">

          <div className="timeline-marker">
            ✓
          </div>

          <div className="timeline-content">
            <div className="roadmap-step-top">
              <div>
                <span className="step-label">STEP 01</span>
                <h4>Master Data Structures</h4>
              </div>

              <span className="roadmap-status completed-status">
                Completed
              </span>
            </div>

            <p>
              Arrays, linked lists, stacks, queues and trees.
            </p>
          </div>

        </div>


        <div className="roadmap-step current">

          <div className="timeline-marker">
            2
          </div>

          <div className="timeline-content">
            <div className="roadmap-step-top">
              <div>
                <span className="step-label">STEP 02</span>
                <h4>Improve React.js</h4>
              </div>

              <span className="roadmap-status current-status">
                In Progress
              </span>
            </div>

            <p>
              Components, props, state and API integration.
            </p>

            <div className="roadmap-mini-progress">
              <div className="roadmap-mini-fill"></div>
            </div>

            <span className="roadmap-progress-text">
              60% completed
            </span>
          </div>

        </div>


        <div className="roadmap-step">

          <div className="timeline-marker">
            3
          </div>

          <div className="timeline-content">
            <div className="roadmap-step-top">
              <div>
                <span className="step-label">STEP 03</span>
                <h4>Learn Machine Learning</h4>
              </div>

              <span className="roadmap-status upcoming-status">
                Upcoming
              </span>
            </div>

            <p>
              Build basic ML models and understand model evaluation.
            </p>
          </div>

        </div>

      </div>

      <button className="dashboard-link-button">
        View Full Roadmap →
      </button>

    </div>
  )
}

export default LearningRoadmap