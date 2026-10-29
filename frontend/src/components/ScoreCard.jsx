import { useEffect, useState } from 'react'

function ScoreCard({ title, score }) {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    if (score === null || score === undefined) {
      setDisplayScore(0)
      return
    }

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

  const notStarted = score === null || score === undefined

  return (
    <div className="score-card">
      <h3>{title}</h3>

      <div className="score">
        {notStarted ? '—' : `${displayScore}%`}
      </div>

      <p>{notStarted ? 'Not started' : 'Current Score'}</p>
    </div>
  )
}

export default ScoreCard
