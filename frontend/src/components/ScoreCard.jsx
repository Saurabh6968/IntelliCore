import { useEffect, useState } from 'react'

function ScoreCard({ title, score }) {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    let current = 0

    const interval = setInterval(() => {
      current += 1

      if (current >= score) {
        current = score
        clearInterval(interval)
      }

      setDisplayScore(current)
    }, 15)

    return () => clearInterval(interval)
  }, [score])

  return (
    <div className="score-card">
      <h3>{title}</h3>

      <div className="score">
        {displayScore}%
      </div>

      <p>Current Score</p>
    </div>
  )
}

export default ScoreCard