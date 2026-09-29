function ATSScore() {
  const atsScore = 85

  const categories = [
    {
      name: 'Keyword Match',
      score: 88,
      description: 'Relevant keywords found in your resume.'
    },
    {
      name: 'Formatting',
      score: 92,
      description: 'Resume structure is easy for ATS systems to read.'
    },
    {
      name: 'Section Structure',
      score: 80,
      description: 'Most important resume sections are present.'
    },
    {
      name: 'Skill Relevance',
      score: 78,
      description: 'Skills have good alignment with your target role.'
    }
  ]

  return (
    <div className="ats-page">

      {/* Header */}

      <div className="page-header">
        <span className="card-eyebrow">
          RESUME INTELLIGENCE
        </span>

        <h1>ATS Score</h1>

        <p>
          Understand how well your resume can perform with
          Applicant Tracking Systems.
        </p>
      </div>


      {/* Main Score */}

      <div className="ats-main-card">

        <div className="ats-score-circle">

          <div className="ats-score-number">
            {atsScore}%
          </div>

          <span>
            ATS Score
          </span>

        </div>


        <div className="ats-score-content">

          <span className="score-status">
            Good Compatibility
          </span>

          <h2>
            Your resume is ATS-friendly
          </h2>

          <p>
            Your resume follows most common ATS requirements.
            Improving keyword alignment and skill relevance could
            make it stronger for your target role.
          </p>

          <div className="ats-progress">

            <div
              className="ats-progress-fill"
              style={{ width: `${atsScore}%` }}
            ></div>

          </div>

          <div className="ats-progress-labels">
            <span>0</span>
            <span>ATS Compatibility</span>
            <span>100</span>
          </div>

        </div>

      </div>


      {/* Category Scores */}

      <div className="ats-categories">

        {categories.map((category) => (
          <div
            className="ats-category-card"
            key={category.name}
          >

            <div className="ats-category-top">

              <span>
                {category.name}
              </span>

              <strong>
                {category.score}%
              </strong>

            </div>

            <div className="category-progress">

              <div
                className="category-progress-fill"
                style={{
                  width: `${category.score}%`
                }}
              ></div>

            </div>

            <p>
              {category.description}
            </p>

          </div>
        ))}

      </div>


      {/* Feedback */}

      <div className="ats-feedback-grid">

        {/* Strengths */}

        <div className="ats-feedback-card">

          <div className="feedback-header">

            <div className="feedback-icon success-icon">
              ✓
            </div>

            <div>
              <h3>ATS Strengths</h3>

              <p>
                Areas where your resume performs well.
              </p>
            </div>

          </div>


          <div className="feedback-list">

            <div>
              <span>✓</span>
              <strong>Clean resume structure</strong>
            </div>

            <div>
              <span>✓</span>
              <strong>Good keyword coverage</strong>
            </div>

            <div>
              <span>✓</span>
              <strong>Readable formatting</strong>
            </div>

          </div>

        </div>


        {/* Improvements */}

        <div className="ats-feedback-card">

          <div className="feedback-header">

            <div className="feedback-icon warning-icon">
              !
            </div>

            <div>
              <h3>Recommended Improvements</h3>

              <p>
                Changes that can improve your ATS score.
              </p>
            </div>

          </div>


          <div className="feedback-list">

            <div>
              <span>!</span>
              <strong>Add role-specific keywords</strong>
            </div>

            <div>
              <span>!</span>
              <strong>Strengthen technical skills</strong>
            </div>

            <div>
              <span>!</span>
              <strong>Add measurable achievements</strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ATSScore