import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001'

function Introduction() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')

  // Load the logged-in user's first name
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) return

    let cancelled = false

    fetch(`${API_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (cancelled || !data || !data.user || !data.user.name) return

        const first = data.user.name.trim().split(' ')[0]
        setFirstName(first.charAt(0).toUpperCase() + first.slice(1))
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  function handleDashboard() {
    navigate('/dashboard')
  }

  return (
    <div className="intro-page">

      {/* Background effects */}
      <div className="intro-stars"></div>
      <div className="intro-orbit intro-orbit-one"></div>
      <div className="intro-orbit intro-orbit-two"></div>
      <div className="intro-glow intro-glow-one"></div>
      <div className="intro-glow intro-glow-two"></div>

      {/* Header */}
      <header className="intro-header">

        <div className="intro-brand">
          <div className="intro-logo">
            I
          </div>

          <span>
            Intelli<span>Core</span>
          </span>
        </div>

        <div className="intro-user">
          <span>
            {firstName ? `Hi, ${firstName} 👋` : 'Hi there 👋'}
          </span>

          <div className="intro-avatar">
            {firstName ? firstName.charAt(0) : '👤'}
          </div>
        </div>

      </header>


      {/* Main Hero */}
      <main className="intro-main">

        {/* Left Content */}
        <section className="intro-copy">

          <div className="intro-eyebrow">
            WELCOME TO INTELLICORE
          </div>

          <h1>
            Your Complete
            <br />

            <span>Placement Intelligence</span>

            <br />

            Platform.
          </h1>

          <p className="intro-description">
            From resume analysis to interview practice, IntelliCore
            uses AI to help you identify your skill gaps, get
            personalized learning guidance and become placement-ready.
          </p>

          <button
            className="intro-dashboard-button"
            onClick={handleDashboard}
          >
            <span className="intro-button-arrow">→</span>
            Enter My Dashboard
          </button>

        </section>


        {/* Right Visual */}
        <section className="intro-visual">

          {/* Floating Resume Card */}
          <div className="intro-floating-card resume-floating">
            <div className="floating-icon blue-icon">
              📄
            </div>

            <div>
              <strong>Resume Analysis</strong>
              <p>Get AI-powered feedback<br />on your resume.</p>
            </div>
          </div>


          {/* Floating Interview Card */}
          <div className="intro-floating-card interview-floating">
            <div className="floating-icon purple-icon">
              🎥
            </div>

            <div>
              <strong>AI Interview Practice</strong>
              <p>Practice with AI-powered<br />mock interviews.</p>
            </div>
          </div>


          {/* Dashboard Laptop */}
          <div className="intro-laptop">

            <div className="laptop-screen">

              {/* Dashboard Header */}
              <div className="mock-dashboard-top">

                <div className="mock-brand">
                  IntelliCore
                </div>

                <div className="mock-search">
                  🔍 Search...
                </div>

                <div className="mock-profile">
                  🔔
                  <span>👤</span>
                </div>

              </div>


              <div className="mock-dashboard-body">

                {/* Mock Sidebar */}
                <div className="mock-sidebar">

                  <div className="mock-sidebar-active">
                    ▣ Dashboard
                  </div>

                  <div>▤ Resume Analysis</div>
                  <div>◫ ATS Score</div>
                  <div>▥ Skill Gap</div>
                  <div>◈ Learning Roadmap</div>
                  <div>◉ AI Interview</div>
                  <div>◎ Readiness Score</div>
                  <div>♢ Career Guidance</div>

                </div>


                {/* Dashboard Content */}
                <div className="mock-content">

                  <div className="mock-welcome">
                    <h3>
                      Welcome back! 👋
                    </h3>

                    <p>
                      Let's make you placement-ready.
                    </p>
                  </div>


                  {/* Score Cards */}
                  <div className="mock-score-row">

                    <div className="mock-score-card">
                      <span>Resume Score</span>
                      <strong>78%</strong>
                      <div className="mock-progress blue-progress"></div>
                    </div>

                    <div className="mock-score-card">
                      <span>Skills Match</span>
                      <strong>65%</strong>
                      <div className="mock-progress yellow-progress"></div>
                    </div>

                    <div className="mock-score-card">
                      <span>Readiness</span>
                      <strong>72%</strong>
                      <div className="mock-progress green-progress"></div>
                    </div>

                    <div className="mock-score-card">
                      <span>Interviews</span>
                      <strong>5</strong>
                      <div className="mock-progress purple-progress"></div>
                    </div>

                  </div>


                  {/* Main Readiness Panel */}
                  <div className="mock-readiness-panel">

                    <div className="mock-readiness-left">

                      <h4>
                        Your Placement Readiness
                      </h4>

                      <div className="mock-readiness-circle">
                        <strong>72%</strong>
                        <span>Ready</span>
                      </div>

                    </div>


                    <div className="mock-checklist">

                      <div>
                        <span>✓</span>
                        Resume Analysis Completed
                      </div>

                      <div>
                        <span>✓</span>
                        Skill Gaps Identified
                      </div>

                      <div>
                        <span>✓</span>
                        Learning Roadmap Generated
                      </div>

                      <div>
                        <span>✓</span>
                        AI Interview Practice Started
                      </div>

                      <div>
                        <span>✓</span>
                        Placement Guidance Available
                      </div>

                    </div>


                    <div className="mock-next-step">

                      <div className="next-icon">
                        ◎
                      </div>

                      <h4>
                        Next Step
                      </h4>

                      <p>
                        Improve DSA skills to boost
                        your placement chances.
                      </p>

                      <button>
                        View Roadmap →
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Laptop base */}
            <div className="intro-laptop-base"></div>

          </div>


          {/* Bottom Floating Cards */}

          <div className="intro-floating-card skill-floating">

            <div className="floating-icon cyan-icon">
              ▥
            </div>

            <div>
              <strong>Skill Gap Analysis</strong>

              <p>
                Find missing skills<br />
                and get personalized<br />
                recommendations.
              </p>
            </div>

          </div>


          <div className="intro-floating-card career-floating">

            <div className="floating-icon orange-icon">
              ♙
            </div>

            <div>
              <strong>Career Guidance</strong>

              <p>
                Get personalized<br />
                recommendations<br />
                for your career.
              </p>
            </div>

          </div>

        </section>

      </main>


      {/* Bottom glow */}
      <div className="intro-bottom-glow"></div>

    </div>
  )
}

export default Introduction
