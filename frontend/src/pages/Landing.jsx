import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  function handleLogin() {
    navigate('/login')
  }

  return (
    <div className="landing-page">

      {/* Background effects */}
      <div className="landing-stars"></div>
      <div className="landing-orbit orbit-one"></div>
      <div className="landing-orbit orbit-two"></div>
      <div className="landing-glow glow-one"></div>
      <div className="landing-glow glow-two"></div>

      {/* Top branding */}
      <header className="landing-topbar">
        <div className="landing-mini-brand">
          <div className="landing-mini-icon">I</div>
          <span>IntelliCore</span>
        </div>

        <div className="landing-top-text">
          SMARTER PREPARATION. BETTER PLACEMENTS.
        </div>
      </header>

      {/* Main content */}
      <main className="landing-content">

        <div className="landing-branding">

         <div className="landing-brand-logo">
          <span>I</span>
         </div>

         <div className="landing-brand-name">
           Intelli<span>Core</span>
        </div>

  <div className="landing-brand-tagline">
    AI-POWERED CAREER INTELLIGENCE
  </div>

</div>

        <div className="landing-hero">

          <h2>
            Your potential.
            <br />
            <span>Your placement.</span>
          </h2>

          <p className="landing-description">
            Analyze your resume, discover skill gaps and prepare
            smarter for your career.
          </p>

          <div className="landing-mission">
            <span>✦</span>
            Your placement is our mission.
          </div>

          <button
            className="landing-login-button"
            onClick={handleLogin}
          >
            <span>→</span>
            Login / Sign Up
          </button>

        </div>

        {/* Feature strip */}
        <div className="landing-features">

          <div className="landing-feature">
            <div className="feature-symbol">▤</div>
            <span>Resume Intelligence</span>
          </div>

          <div className="landing-feature">
            <div className="feature-symbol">◈</div>
            <span>Skill Gap Analysis</span>
          </div>

          <div className="landing-feature">
            <div className="feature-symbol">✦</div>
            <span>AI Interview Practice</span>
          </div>

          <div className="landing-feature">
            <div className="feature-symbol">↗</div>
            <span>Career Guidance</span>
          </div>

        </div>

      </main>

      <div className="landing-bottom-glow"></div>

    </div>
  )
}

export default Landing