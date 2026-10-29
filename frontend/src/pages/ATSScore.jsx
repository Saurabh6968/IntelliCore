
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ATSScore() {
  const [ats, setAts] = useState(null)
  const [hasResult, setHasResult] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const savedAts = sessionStorage.getItem('atsResult')

      if (savedAts) {
        const parsedAts = JSON.parse(savedAts)

        if (
          parsedAts &&
          typeof parsedAts.score === 'number' &&
          Array.isArray(parsedAts.categories)
        ) {
          setAts(parsedAts)
          setHasResult(true)
        }
      }
    } catch (error) {
      console.error('Unable to load ATS result:', error)
    }
  }, [])

  const atsScore = ats?.score ?? null

  const descriptions = {
    'Keyword Match':
      'Relevant technical keywords found in your resume.',
    Formatting:
      'Basic resume text readability check.',
    'Section Structure':
      'Important resume sections detected.',
  }

  const categories = (ats?.categories || []).map((category) => ({
    ...category,
    description:
      descriptions[category.name] ||
      'Resume compatibility indicator.',
  }))

  const scoreStatus =
    atsScore === null
      ? 'Awaiting Analysis'
      : atsScore >= 80
        ? 'Excellent Compatibility'
        : atsScore >= 60
          ? 'Good Compatibility'
          : atsScore >= 40
            ? 'Needs Improvement'
            : 'Low Compatibility'

  const strengths = [
    {
      name: 'Section Structure',
      threshold: 70,
      message: 'Your resume contains important sections.',
    },
    {
      name: 'Keyword Match',
      threshold: 70,
      message: 'Your resume has relevant keyword coverage.',
    },
    {
      name: 'Formatting',
      threshold: 70,
      message: 'Your resume passed the basic text readability check.',
    },
  ]

  const improvements = [
    {
      name: 'Keyword Match',
      message: 'Review your resume keywords for your target role.',
    },
    {
      name: 'Section Structure',
      message: 'Make sure your education, experience, projects and skills are clearly listed.',
    },
    {
      name: 'Formatting',
      message: 'Keep your resume readable and use clear section headings.',
    },
  ]

  const categoryScore = (name) =>
    categories.find((category) => category.name === name)?.score

  const visibleStrengths = strengths.filter((item) => {
    const score = categoryScore(item.name)
    return typeof score === 'number' && score >= item.threshold
  })

  const visibleImprovements = improvements.filter((item) => {
    const score = categoryScore(item.name)
    return typeof score === 'number' && score < 70
  })

  return (
    <div className="ats-page">
      <div className="page-header">
        <span className="card-eyebrow">RESUME INTELLIGENCE</span>

        <h1>ATS Score</h1>

        <p>
          Understand how well your resume can perform with
          Applicant Tracking Systems.
        </p>
      </div>

      {!hasResult && (
        <div className="ats-feedback-card">
          <h3>No ATS result available</h3>
          <p>
            Upload and analyze your resume first to see your ATS score.
          </p>
          <button
            className="analyze-resume-button"
            onClick={() => navigate('/resume-analysis')}
          >
            Analyze Resume →
          </button>
        </div>
      )}

      <div className="ats-main-card">
        <div className="ats-score-circle">
          <div className="ats-score-number">
            {atsScore === null ? '—' : `${atsScore}%`}
          </div>

          <span>ATS Score</span>
        </div>

        <div className="ats-score-content">
          <span className="score-status">{scoreStatus}</span>

          <h2>
            {atsScore === null
              ? 'Your resume score will appear here'
              : 'Your resume compatibility result'}
          </h2>

          <p>
            {atsScore === null
              ? 'Analyze your resume to calculate a basic ATS compatibility estimate.'
              : 'This score is calculated from resume section structure, keyword coverage and a basic text readability check. It is an estimate, not a score from a commercial ATS.'}
          </p>

          <div className="ats-progress">
            <div
              className="ats-progress-fill"
              style={{ width: `${atsScore ?? 0}%` }}
            />
          </div>

          <div className="ats-progress-labels">
            <span>0</span>
            <span>ATS Compatibility</span>
            <span>100</span>
          </div>
        </div>
      </div>

      <div className="ats-categories">
        {categories.map((category) => (
          <div
            className="ats-category-card"
            key={category.name}
          >
            <div className="ats-category-top">
              <span>{category.name}</span>

              <strong>
                {category.score}%
              </strong>
            </div>

            <div className="category-progress">
              <div
                className="category-progress-fill"
                style={{
                  width: `${category.score ?? 0}%`,
                }}
              />
            </div>

            <p>{category.description}</p>
          </div>
        ))}
      </div>

      <div className="ats-feedback-grid">
        <div className="ats-feedback-card">
          <div className="feedback-header">
            <div className="feedback-icon success-icon">✓</div>

            <div>
              <h3>ATS Strengths</h3>
              <p>Areas where your resume performs well.</p>
            </div>
          </div>

          <div className="feedback-list">
            {!hasResult || visibleStrengths.length === 0 ? (
              <p>Analyze your resume to identify strengths.</p>
            ) : (
              visibleStrengths.map((item) => (
                <div key={item.name}>
                  <span>✓</span>
                  <strong>{item.message}</strong>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="ats-feedback-card">
          <div className="feedback-header">
            <div className="feedback-icon warning-icon">!</div>

            <div>
              <h3>Recommended Improvements</h3>
              <p>Changes that may improve compatibility.</p>
            </div>
          </div>

          <div className="feedback-list">
            {!hasResult ? (
              <p>Analyze your resume to receive recommendations.</p>
            ) : visibleImprovements.length === 0 ? (
              <p>
                No low-scoring categories were detected by this basic
                scoring method.
              </p>
            ) : (
              visibleImprovements.map((item) => (
                <div key={item.name}>
                  <span>!</span>
                  <strong>{item.message}</strong>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ATSScore
