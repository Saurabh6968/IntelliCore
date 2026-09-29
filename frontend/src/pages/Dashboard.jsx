import Navbar from '../components/Navbar'
import ScoreCard from '../components/ScoreCard'
import ResumeCard from '../components/ResumeCard'
import SkillGap from '../components/SkillGap'
import LearningRoadmap from '../components/LearningRoadmap'
import InterviewCard from '../components/InterviewCard'
import ReadinessCard from '../components/ReadinessCard'

function Dashboard() {
  return (
    <>
      <Navbar />

      <section className="dashboard-content">
         <div className="dashboard-intro">
           <div>
            <span className="dashboard-eyebrow">
               PLACEMENT INTELLIGENCE
            </span>

           <h1>Your Placement Dashboard</h1>

           <p>
            Track your resume quality, skills and overall placement readiness
            in one place.
          </p>
        </div>

        <div className="dashboard-status">
           <span className="status-dot"></span>
            Profile Active
        </div>
        </div>

        <div className="score-cards">
          <ScoreCard title="ATS Score" score={82} />
          <ScoreCard title="Skill Match" score={74} />
          <ScoreCard title="Placement Readiness" score={68} />
        </div>

        <ResumeCard />

        <div className="analysis-grid">
          <SkillGap />
          <LearningRoadmap />
        </div>

        <div className="bottom-grid">
          <InterviewCard />
          <ReadinessCard />
        </div>

      </section>
    </>
  )
}

export default Dashboard