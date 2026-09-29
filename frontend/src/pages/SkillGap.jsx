function SkillGap() {
  const skills = [
    {
      name: 'Python',
      score: 82,
      status: 'Good',
      type: 'good'
    },
    {
      name: 'React.js',
      score: 68,
      status: 'Intermediate',
      type: 'medium'
    },
    {
      name: 'Data Structures',
      score: 45,
      status: 'Needs Improvement',
      type: 'low'
    },
    {
      name: 'Machine Learning',
      score: 42,
      status: 'Needs Improvement',
      type: 'low'
    }
  ]

  return (
    <div className="skill-page">

      {/* Header */}

      <div className="page-header">

        <span className="card-eyebrow">
          SKILL INTELLIGENCE
        </span>

        <h1>Skill Gap Analysis</h1>

        <p>
          Understand your current skills and identify the areas
          that need improvement for your target role.
        </p>

      </div>


      {/* Summary Cards */}

      <div className="skill-summary">

        <div className="skill-summary-card">

          <span>Overall Skill Match</span>

          <strong>74%</strong>

          <p>
            Alignment with your target role
          </p>

        </div>


        <div className="skill-summary-card">

          <span>Skills Identified</span>

          <strong>12</strong>

          <p>
            Technical and professional skills
          </p>

        </div>


        <div className="skill-summary-card">

          <span>Skills to Improve</span>

          <strong>4</strong>

          <p>
            Recommended areas of focus
          </p>

        </div>

      </div>


      {/* Skill Profile */}

      <div className="skill-profile-card">

        <div className="section-heading">

          <div>
            <span className="card-eyebrow">
              YOUR SKILL PROFILE
            </span>

            <h2>Current Skill Levels</h2>

            <p>
              Based on your resume and current profile.
            </p>
          </div>

        </div>


        <div className="skill-profile-list">

          {skills.map((skill) => (

            <div
              className="skill-profile-item"
              key={skill.name}
            >

              <div className="skill-profile-info">

                <div>
                  <strong>{skill.name}</strong>

                  <span className={`skill-status ${skill.type}`}>
                    {skill.status}
                  </span>
                </div>

                <strong className="skill-percentage">
                  {skill.score}%
                </strong>

              </div>


              <div className="skill-progress">

                <div
                  className={`skill-progress-fill ${skill.type}`}
                  style={{
                    width: `${skill.score}%`
                  }}
                ></div>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* Focus Areas */}

      <div className="skill-focus-card">

        <div className="section-heading">

          <div>
            <span className="card-eyebrow">
              RECOMMENDED FOCUS
            </span>

            <h2>Areas to Improve</h2>

            <p>
              Focus on these skills to improve your placement readiness.
            </p>
          </div>

        </div>


        <div className="focus-list">

          <div className="focus-item">

            <div className="focus-number">
              01
            </div>

            <div>
              <strong>
                Data Structures & Algorithms
              </strong>

              <span>
                Strengthen problem-solving and core DSA concepts.
              </span>
            </div>

          </div>


          <div className="focus-item">

            <div className="focus-number">
              02
            </div>

            <div>
              <strong>
                Machine Learning
              </strong>

              <span>
                Improve understanding of ML fundamentals and model evaluation.
              </span>
            </div>

          </div>


          <div className="focus-item">

            <div className="focus-number">
              03
            </div>

            <div>
              <strong>
                Advanced React.js
              </strong>

              <span>
                Improve state management, APIs and advanced React concepts.
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default SkillGap