function Readiness() {
  const categories = [
    {
      name: 'Resume Quality',
      score: 82
    },
    {
      name: 'ATS Compatibility',
      score: 85
    },
    {
      name: 'Skill Match',
      score: 74
    },
    {
      name: 'Interview Performance',
      score: 68
    }
  ]

  return (
    <div className="readiness-page">

      {/* Header */}

      <div className="page-header">

        <span className="card-eyebrow">
          PLACEMENT INTELLIGENCE
        </span>

        <h1>Placement Readiness</h1>

        <p>
          Understand your current preparation level and identify
          what you should improve before placement.
        </p>

      </div>


      {/* Overall Readiness */}

      <div className="readiness-overview">

        <div className="readiness-score-section">

          <span className="card-eyebrow">
            OVERALL READINESS
          </span>

          <div className="readiness-big-score">
            68%
          </div>

          <span className="readiness-status">
            Good Progress
          </span>

          <p>
            You have built a good foundation for placement.
            Focus on improving your technical skills and interview
            performance to become more placement-ready.
          </p>

        </div>


        <div className="readiness-progress-section">

          <div className="readiness-progress-top">
            <span>Placement Readiness</span>
            <strong>68 / 100</strong>
          </div>

          <div className="readiness-large-bar">

            <div
              className="readiness-large-fill"
              style={{ width: '68%' }}
            ></div>

          </div>

          <div className="readiness-scale">
            <span>Needs Work</span>
            <span>Developing</span>
            <span>Ready</span>
          </div>

        </div>

      </div>


      {/* Breakdown */}

      <div className="readiness-breakdown">

        <div className="readiness-section-header">

          <div>
            <span className="card-eyebrow">
              READINESS BREAKDOWN
            </span>

            <h2>Performance Areas</h2>

            <p>
              Your readiness score across key placement factors.
            </p>
          </div>

        </div>


        <div className="readiness-category-list">

          {categories.map((category) => (

            <div
              className="readiness-category"
              key={category.name}
            >

              <div className="readiness-category-top">

                <span>
                  {category.name}
                </span>

                <strong>
                  {category.score}%
                </strong>

              </div>

              <div className="readiness-category-bar">

                <div
                  className="readiness-category-fill"
                  style={{
                    width: `${category.score}%`
                  }}
                ></div>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* Improvement Areas */}

      <div className="readiness-improvements">

        <div className="readiness-section-header">

          <div>
            <span className="card-eyebrow">
              RECOMMENDED ACTIONS
            </span>

            <h2>Areas to Improve</h2>

            <p>
              Focus on these areas to increase your readiness score.
            </p>
          </div>

        </div>


        <div className="improvement-grid">

          <div className="improvement-card">

            <span className="improvement-number">
              01
            </span>

            <h3>
              Strengthen Technical Skills
            </h3>

            <p>
              Focus on Data Structures, Algorithms and
              Machine Learning fundamentals.
            </p>

          </div>


          <div className="improvement-card">

            <span className="improvement-number">
              02
            </span>

            <h3>
              Practice Interviews
            </h3>

            <p>
              Complete more interview sessions and improve
              the quality of your answers.
            </p>

          </div>


          <div className="improvement-card">

            <span className="improvement-number">
              03
            </span>

            <h3>
              Optimize Your Resume
            </h3>

            <p>
              Improve keywords, achievements and role-specific
              resume content.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Readiness