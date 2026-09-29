function ResumeResults() {
  return (
    <div className="results-page">

      <div className="page-header">
        <span className="card-eyebrow">AI RESUME REPORT</span>

        <h1>Resume Analysis Results</h1>

        <p>
          Here's what IntelliCore found in your resume and where you
          can improve it.
        </p>
      </div>


      {/* Overall Score */}

      <div className="results-overview">

        <div className="overall-score">

          <span className="card-eyebrow">
            OVERALL RESUME SCORE
          </span>

          <div className="overall-score-value">
            82%
          </div>

          <span className="score-status">
            Good Resume
          </span>

          <p>
            Your resume has a strong foundation but there are a few
            areas that can be improved for better placement readiness.
          </p>

        </div>


        <div className="score-summary">

          <div className="summary-item">
            <span>ATS Compatibility</span>
            <strong>85%</strong>
          </div>

          <div className="summary-item">
            <span>Content Quality</span>
            <strong>82%</strong>
          </div>

          <div className="summary-item">
            <span>Skill Relevance</span>
            <strong>78%</strong>
          </div>

          <div className="summary-item">
            <span>Formatting</span>
            <strong>88%</strong>
          </div>

        </div>

      </div>


      {/* Strengths and Improvements */}

      <div className="results-grid">

        <div className="result-section">

          <div className="result-section-header">
            <div className="result-icon success-icon">
              ✓
            </div>

            <div>
              <h3>Resume Strengths</h3>
              <p>What your resume is doing well.</p>
            </div>
          </div>


          <div className="result-list">

            <div className="result-list-item">
              <span>✓</span>
              <div>
                <strong>Clear technical skills</strong>
                <p>
                  Your technical skills are clearly listed and easy to identify.
                </p>
              </div>
            </div>

            <div className="result-list-item">
              <span>✓</span>
              <div>
                <strong>Relevant project experience</strong>
                <p>
                  Your projects demonstrate practical technical experience.
                </p>
              </div>
            </div>

            <div className="result-list-item">
              <span>✓</span>
              <div>
                <strong>Good formatting</strong>
                <p>
                  The overall resume structure is clean and readable.
                </p>
              </div>
            </div>

          </div>

        </div>


        <div className="result-section">

          <div className="result-section-header">
            <div className="result-icon warning-icon">
              !
            </div>

            <div>
              <h3>Areas to Improve</h3>
              <p>Changes that could strengthen your resume.</p>
            </div>
          </div>


          <div className="result-list">

            <div className="result-list-item">
              <span>!</span>
              <div>
                <strong>Add measurable achievements</strong>
                <p>
                  Include numbers and measurable results in your projects.
                </p>
              </div>
            </div>

            <div className="result-list-item">
              <span>!</span>
              <div>
                <strong>Improve your summary</strong>
                <p>
                  Make your professional summary more specific to your target role.
                </p>
              </div>
            </div>

            <div className="result-list-item">
              <span>!</span>
              <div>
                <strong>Add relevant keywords</strong>
                <p>
                  Include keywords that match your desired technical role.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>


      {/* Recommendations */}

      <div className="recommendations-card">

        <div>
          <span className="card-eyebrow">
            AI RECOMMENDATIONS
          </span>

          <h3>Recommended Next Steps</h3>

          <p>
            Focus on these improvements before submitting your resume
            for placement opportunities.
          </p>
        </div>


        <div className="recommendation-items">

          <div className="recommendation-item">
            <span>01</span>
            <strong>Strengthen project descriptions</strong>
          </div>

          <div className="recommendation-item">
            <span>02</span>
            <strong>Add measurable achievements</strong>
          </div>

          <div className="recommendation-item">
            <span>03</span>
            <strong>Optimize keywords for ATS</strong>
          </div>

        </div>

      </div>

    </div>
  )
}

export default ResumeResults