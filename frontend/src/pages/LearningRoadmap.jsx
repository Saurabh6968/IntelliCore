function LearningRoadmap() {
  const roadmap = [
    {
      number: '01',
      title: 'Python Fundamentals',
      description:
        'Variables, functions, data structures and object-oriented programming.',
      time: '2 weeks',
      status: 'completed'
    },
    {
      number: '02',
      title: 'SQL & Databases',
      description:
        'SQL queries, joins, normalization and database fundamentals.',
      time: '2 weeks',
      status: 'completed'
    },
    {
      number: '03',
      title: 'Data Structures & Algorithms',
      description:
        'Arrays, linked lists, stacks, queues, trees and problem solving.',
      time: '4 weeks',
      status: 'current'
    },
    {
      number: '04',
      title: 'Machine Learning Fundamentals',
      description:
        'Supervised learning, model evaluation and basic ML algorithms.',
      time: '4 weeks',
      status: 'upcoming'
    },
    {
      number: '05',
      title: 'Advanced React.js',
      description:
        'State management, API integration and advanced React concepts.',
      time: '3 weeks',
      status: 'upcoming'
    }
  ]

  const completedTopics = roadmap.filter(
    (item) => item.status === 'completed'
  ).length

  const progress = Math.round(
    (completedTopics / roadmap.length) * 100
  )

  return (
    <div className="roadmap-page">

      {/* Header */}

      <div className="page-header">

        <span className="card-eyebrow">
          CAREER DEVELOPMENT
        </span>

        <h1>Learning Roadmap</h1>

        <p>
          Follow a personalized learning path based on your
          identified skill gaps.
        </p>

      </div>


      {/* Progress */}

      <div className="roadmap-progress-card">

        <div className="roadmap-progress-header">

          <div>
            <span className="card-eyebrow">
              YOUR PROGRESS
            </span>

            <h2>
              Learning Journey
            </h2>

            <p>
              {completedTopics} of {roadmap.length} recommended
              topics completed
            </p>
          </div>

          <strong>
            {progress}%
          </strong>

        </div>


        <div className="roadmap-progress-bar">

          <div
            className="roadmap-progress-fill"
            style={{
              width: `${progress}%`
            }}
          ></div>

        </div>

      </div>


      {/* Roadmap */}

      <div className="roadmap-container">

        {roadmap.map((item, index) => (

          <div
            className={`roadmap-step ${item.status}`}
            key={item.number}
          >

            {/* Timeline */}

            <div className="roadmap-timeline">

              <div className="roadmap-node">

                {item.status === 'completed'
                  ? '✓'
                  : item.number}

              </div>

              {index !== roadmap.length - 1 && (
                <div className="roadmap-line"></div>
              )}

            </div>


            {/* Content */}

            <div className="roadmap-step-card">

              <div className="roadmap-step-top">

                <div>

                  <span className="roadmap-status">
                    {item.status === 'completed'
                      ? 'COMPLETED'
                      : item.status === 'current'
                        ? 'CURRENT'
                        : 'UPCOMING'}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                </div>

                <span className="roadmap-time">
                  {item.time}
                </span>

              </div>


              <p>
                {item.description}
              </p>


              {item.status === 'current' && (
                <button className="roadmap-action">
                  Continue Learning →
                </button>
              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default LearningRoadmap