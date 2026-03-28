import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Navbar from '../components/business/Navbar'
import Tag from '../components/common/Tag'
import ClubCard from '../components/business/ClubCard'
import { clubs } from '../data/clubs'
import { getFavorites, toggleFavorite } from '../utils/storage'

function ClubDetailPage() {
  const { id } = useParams()
  const club = useMemo(() => clubs.find((item) => item.id === id), [id])
  const [favorites, setFavorites] = useState(getFavorites())
  const [applied, setApplied] = useState(false)

  if (!club) {
    return <Navigate to="/" replace />
  }

  const similarClubs = clubs.filter((item) => item.id !== club.id).slice(0, 2)

  const handleToggleFavorite = () => {
    const next = toggleFavorite(club.id)
    setFavorites(next)
  }

  const handleApply = () => {
    setApplied(true)
  }

  return (
    <div className="page-shell">
      <Navbar />

      <main className="section-block">
        <div className="container-main">
          <div className="mb-6">
            <Link to="/results" className="btn-ghost">
              ← 返回推荐结果
            </Link>
          </div>

          <div className="card-base overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[420px_1fr]">
              <div className="min-h-[320px] bg-ink-100">
                <img src={club.cover} alt={club.name} className="h-full w-full object-cover" />
              </div>

              <div className="p-6 sm:p-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Tag>{club.category}</Tag>
                  {club.tags?.map((tag) => (
                    <Tag key={tag} variant="muted">
                      {tag}
                    </Tag>
                  ))}
                </div>

                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-ink-900">{club.name}</h1>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <span className="rounded-full bg-brand-500 px-3 py-1 text-sm font-semibold text-white">
                        匹配度 {club.matchScore}%
                      </span>
                      <span className="rounded-full bg-ink-100 px-3 py-1 text-sm font-medium text-ink-600">
                        {club.recruitStatus}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button type="button" className="btn-secondary" onClick={handleToggleFavorite}>
                      {favorites.includes(club.id) ? '已收藏' : '收藏社团'}
                    </button>
                    <button type="button" className="btn-primary" onClick={handleApply}>
                      {applied ? '已报名' : '立即报名'}
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="text-lg font-bold text-ink-900">社团简介</div>
                  <p className="mt-3 text-sm leading-7 text-ink-600">{club.description}</p>
                </div>

                {applied ? (
                  <div className="mt-6 rounded-2xl bg-brand-50 px-4 py-4 text-sm leading-7 text-brand-700">
                    报名申请已提交，请留意后续通知。你也可以先收藏该社团，方便后续继续查看招新信息。
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="card-base p-6">
              <div className="text-xl font-bold text-ink-900">为什么推荐你加入</div>
              <div className="mt-4 space-y-3">
                {club.matchReasons.slice(0, 3).map((reason) => (
                  <div
                    key={reason}
                    className="rounded-2xl bg-brand-50 px-4 py-3 text-sm leading-6 text-brand-700"
                  >
                    {reason}
                  </div>
                ))}
              </div>
            </div>

            <div className="card-base p-6">
              <div className="text-xl font-bold text-ink-900">活动与招新信息</div>
              <div className="mt-4 space-y-3 text-sm text-ink-600">
                <div className="rounded-2xl border border-ink-100 bg-ink-50 px-4 py-3">
                  活动频率：{club.activityFrequency}
                </div>
                <div className="rounded-2xl border border-ink-100 bg-ink-50 px-4 py-3">
                  招新方式：{club.recruitmentType}
                </div>
                <div className="rounded-2xl border border-ink-100 bg-ink-50 px-4 py-3">
                  截止时间：{club.deadline}
                </div>
                <div className="rounded-2xl border border-ink-100 bg-ink-50 px-4 py-3">
                  适合人群：{club.suitableFor}
                </div>
                <div className="rounded-2xl border border-ink-100 bg-ink-50 px-4 py-3">
                  成长方向：{club.growthType}
                </div>
                <div className="rounded-2xl border border-ink-100 bg-ink-50 px-4 py-3">
                  活动地点：{club.location}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="card-base p-6">
              <div className="text-xl font-bold text-ink-900">常见活动</div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-ink-600">
                {club.commonActivities.map((activity) => (
                  <div key={activity}>• {activity}</div>
                ))}
              </div>
            </div>

            <div className="card-base p-6">
              <div className="text-xl font-bold text-ink-900">过来人怎么说</div>
              <div className="mt-4 space-y-3">
                {club.testimonials.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-ink-100 bg-white px-4 py-4 text-sm leading-7 text-ink-600"
                  >
                    “{item}”
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 card-base p-6">
            <div className="text-xl font-bold text-ink-900">报名须知</div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-ink-600">
              <div>• 报名后请留意社团后续通知，面试时间以实际消息为准。</div>
              <div>• 如果你还没完全决定，也可以先收藏社团，后续再比较。</div>
              <div>• 新生通常都可以先参加体验活动，再决定是否长期参与。</div>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-6 text-2xl font-bold text-ink-900">你还可以看看这些社团</div>
            <div className="grid gap-6 md:grid-cols-2">
              {similarClubs.map((item) => (
                <ClubCard key={item.id} club={item} compact mode="browse" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ClubDetailPage