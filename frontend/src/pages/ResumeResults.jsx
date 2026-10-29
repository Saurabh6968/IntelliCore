
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ResumeResults() {
  const [analysis, setAnalysis] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const savedAnalysis = sessionStorage.getItem('resumeAnalysis')

    if (!savedAnalysis) {
      navigate('/resume-analysis')
      return
    }

    try {
      setAnalysis(JSON.parse(savedAnalysis))
    } catch {
      sessionStorage.removeItem('resumeAnalysis')
      navigate('/resume-analysis')
    }
  }, [navigate])

  if (!analysis) {
    return <div className="results-page">Loading analysis...</div>
  }

  const mainSkills = Array.isArray(analysis.mainSkills)
    ? analysis.mainSkills
    : []

  const strongAreas = Array.isArray(analysis.strongAreas)
    ? analysis.strongAreas
    : []

  const missingSkills = Array.isArray(analysis.missingSkills)
    ? analysis.missingSkills
    : []

  const suitableRoles = Array.isArray(analysis.suitableRoles)
    ? analysis.suitableRoles
    : []

  const suggestions = Array.isArray(analysis.suggestions)
    ? analysis.suggestions
    : []

  return (
    <div className="results-page">
      <div className="page-header">
        <span className="card-eyebrow">AI RESUME REPORT</span>
        <h1>Resume Analysis Results</h1>
        <p>
          Here's what the AI found in your resume and where you can improve.
        </p>
      </div>

      <div className="results-overview">
        <div className="overall-score">
          <span className="card-eyebrow">RESUME ANALYSIS</span>
          <div className="overall-score-value">✓</div>
          <span className="score-status">Analysis Complete</span>
          <p>
            Your resume has been analyzed. Review the findings and suggestions
            below.
          </p>
        </div>

        <div className="score-summary">
          <div className="summary-item">
            <span>Skills Identified</span>
            <strong>{mainSkills.length}</strong>
          </div>
          <div className="summary-item">
            <span>Strong Areas</span>
            <strong>{strongAreas.length}</strong>
          </div>
          <div className="summary-item">
            <span>Missing Skills</span>
            <strong>{missingSkills.length}</strong>
          </div>
          <div className="summary-item">
            <span>Suggested Roles</span>
            <strong>{suitableRoles.length}</strong>
          </div>
        </div>
      </div>

      <div className="results-grid">
        <div className="result-section">
          <div className="result-section-header">
            <div className="result-icon success-icon">✓</div>
            <div>
              <h3>Skills Identified</h3>
              <p>Skills found in your resume.</p>
            </div>
          </div>

          <div className="result-list">
            {mainSkills.length ? mainSkills.map((skill, index) => (
              <div className="result-list-item" key={index}>
                <span>✓</span>
                <div><strong>{skill}</strong></div>
              </div>
            )) : <p>No skills were identified.</p>}
          </div>
        </div>

        <div className="result-section">
          <div className="result-section-header">
            <div className="result-icon success-icon">✓</div>
            <div>
              <h3>Resume Strengths</h3>
              <p>Strong points identified by the AI.</p>
            </div>
          </div>

          <div className="result-list">
            {strongAreas.length ? strongAreas.map((item, index) => (
              <div className="result-list-item" key={index}>
                <span>✓</span>
                <div><p>{item}</p></div>
              </div>
            )) : <p>No strong areas were returned.</p>}
          </div>
        </div>

        <div className="result-section">
          <div className="result-section-header">
            <div className="result-icon warning-icon">!</div>
            <div>
              <h3>Missing Skills</h3>
              <p>Potential skills to develop for your target roles.</p>
            </div>
          </div>

          <div className="result-list">
            {missingSkills.length ? missingSkills.map((skill, index) => (
              <div className="result-list-item" key={index}>
                <span>!</span>
                <div><p>{skill}</p></div>
              </div>
            )) : <p>No missing skills were reported.</p>}
          </div>
        </div>

        <div className="result-section">
          <div className="result-section-header">
            <div className="result-icon success-icon">↗</div>
            <div>
              <h3>Suitable Roles</h3>
              <p>Roles that may match your current resume.</p>
            </div>
          </div>

          <div className="result-list">
            {suitableRoles.length ? suitableRoles.map((role, index) => (
              <div className="result-list-item" key={index}>
                <span>↗</span>
                <div><strong>{role}</strong></div>
              </div>
            )) : <p>No suitable roles were returned.</p>}
          </div>
        </div>
      </div>

      <div className="recommendations-card">
        <div>
          <span className="card-eyebrow">AI RECOMMENDATIONS</span>
          <h3>Recommended Next Steps</h3>
          <p>Suggestions generated from your resume analysis.</p>
        </div>

        <div className="recommendation-items">
          {suggestions.length ? suggestions.map((suggestion, index) => (
            <div className="recommendation-item" key={index}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{suggestion}</strong>
            </div>
          )) : <p>No recommendations were returned.</p>}
        </div>
      </div>
    </div>
  )
}

export default ResumeResults
