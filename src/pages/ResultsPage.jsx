import { Link, Navigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import Navbar from '../components/business/Navbar'
import SectionHeader from '../components/common/SectionHeader'
import Tag from '../components/common/Tag'
import RecommendationCard from '../components/business/RecommendationCard'
import { clubs } from '../data/clubs'
import { getFavorites, getQuizResult, toggleFavorite } from '../utils/storage'
import { getRecommendedClubs } from '../utils/recommendation'

function ResultsPage() {
  const quiz = getQuizResult()
  const [favorites, setFavorites] = useState(getFavorites())

  const recommended = useMemo(() => {
    if (!quiz) return []
    return getRecommendedClubs(quiz, clubs).slice(0, 3)
  }, [quiz])

  if (!quiz) {
    return <Navigate to="/results-guide" replace />
  }

  const handleToggleFavorite = (clubId) => {
    const next = toggleFavorite(clubId)
    setFavorites(next)
  }

  return (
    <div className="page-shell">
      <Navbar />

      <main className="section-block">
        <div className="container-main">
          <SectionHeader
            eyebrow="推荐结果"
            title="为你找到 3 个高匹配社团"
            subtitle="基于你的兴趣、性格、时间投入和目标偏好，生成以下个性化推荐结果。"
            align="left"
          />

          <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="card-base p-6">
              <div className="text-lg font-bold text-ink-900">你的画像标签</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {quiz.interests.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
                {quiz.personality ? <Tag>{quiz.personality}</Tag> : null}
                {quiz.timeCommitment ? <Tag>{quiz.timeCommitment}</Tag> : null}
                {quiz.goals.map((item) => (
                  <Tag key={item} variant="muted">
                    {item}
                  </Tag>
                ))}
                {quiz.pace ? <Tag variant="muted">{quiz.pace}</Tag> : null}
              </div>
              <p className="mt-4 text-sm leading-7 text-ink-600">
                你更适合兼具成长性、参与感和一定展示机会的社团。建议优先查看匹配度高、活动节奏适合、推荐理由更清晰的社团。
              </p>
            </div>

            <Link to="/quiz" className="btn-secondary">
              重新测评
            </Link>
          </div>

          <div className="space-y-6">
            {recommended.map((club) => (
              <RecommendationCard
                key={club.id}
                club={club}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(club.id)}
              />
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="card-base p-6">
              <div className="text-xl font-bold text-ink-900">推荐逻辑说明</div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-ink-600">
                <div>• 兴趣方向是否与社团核心活动一致</div>
                <div>• 性格倾向与社团互动形式是否契合</div>
                <div>• 时间投入与活动节奏是否匹配</div>
                <div>• 你的目标偏好是否能在社团里获得满足</div>
              </div>
            </div>

            <div className="card-base p-6">
              <div className="text-xl font-bold text-ink-900">如果你还没决定，可以这样选</div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-ink-600">
                <div>• 想快速融入校园：优先看社交氛围强、参与门槛低的社团</div>
                <div>• 想提升能力或丰富简历：优先看项目制、比赛型、训练营型社团</div>
                <div>• 想控制时间成本：优先看活动更灵活或轻投入标签的社团</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ResultsPage