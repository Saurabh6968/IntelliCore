function CareerGuidance() {
  const careerPaths = [
    {
      title: 'AI / ML Engineer',
      match: 82,
      description:
        'Build machine learning models and AI-powered applications.'
    },
    {
      title: 'Data Analyst',
      match: 76,
      description:
        'Work with data, SQL, visualization and business insights.'
    },
    {
      title: 'Software Developer',
      match: 71,
      description:
        'Build software applications using programming and web technologies.'
    }
  ]

  const recommendations = [
    'Strengthen Data Structures and Algorithms',
    'Improve Machine Learning fundamentals',
    'Build 2–3 role-specific projects',
    'Practice technical and HR interviews'
  ]

  return (
    <div className="career-page">

      <div className="page-header">
        <span className="card-eyebrow">
          CAREER INTELLIGENCE
        </span>

        <h1>Career Guidance</h1>

        <p>
          Explore career paths and get personalized recommendations
          based on your current skills and placement profile.
        </p>
      </div>


      {/* Career Profile */}

      <div className="career-profile">

        <div>
          <span className="card-eyebrow">
            YOUR CAREER PROFILE
          </span>

          <h2>Current Career Direction</h2>

          <p>
            Based on your current skills, resume and learning progress.
          </p>
        </div>

        <div className="career-profile-details">

          <div>
            <span>Target Role</span>
            <strong>AI / ML Engineer</strong>
          </div>

          <div>
            <span>Experience Level</span>
            <strong>Student / Fresher</strong>
          </div>

          <div>
            <span>Skill Match</span>
            <strong>74%</strong>
          </div>

        </div>

      </div>


      {/* Career Paths */}

      <div className="career-section">

        <div className="career-section-header">

          <div>
            <span className="card-eyebrow">
              RECOMMENDED PATHS
            </span>

            <h2>Career Options</h2>

            <p>
              Career paths aligned with your current profile.
            </p>
          </div>

        </div>


        <div className="career-path-grid">

          {careerPaths.map((career) => (

            <div
              className="career-path-card"
              key={career.title}
            >

              <div className="career-path-top">

                <div className="career-path-icon">
                  ✦
                </div>

                <span className="career-match">
                  {career.match}% Match
                </span>

              </div>

              <h3>
                {career.title}
              </h3>

              <p>
                {career.description}
              </p>

              <div className="career-match-bar">

                <div
                  className="career-match-fill"
                  style={{
                    width: `${career.match}%`
                  }}
                ></div>

              </div>

              <button className="career-explore-button">
                Explore Path →
              </button>

            </div>

          ))}

        </div>

      </div>


      {/* AI Advice */}

      <div className="career-advice">

        <div className="career-advice-header">

          <div className="career-ai-icon">
            AI
          </div>

          <div>
            <span className="card-eyebrow">
              AI CAREER ADVICE
            </span>

            <h2>Your Recommended Next Steps</h2>

            <p>
              Focus on these areas to move closer to your target career.
            </p>
          </div>

        </div>


        <div className="career-recommendations">

          {recommendations.map((recommendation, index) => (

            <div
              className="career-recommendation"
              key={recommendation}
            >

              <span>
                {String(index + 1).padStart(2, '0')}
              </span>

              <strong>
                {recommendation}
              </strong>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default CareerGuidance