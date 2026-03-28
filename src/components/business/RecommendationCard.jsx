import { Link } from 'react-router-dom'
import Tag from '../common/Tag'

function RecommendationCard({ club, onToggleFavorite, isFavorite }) {
  return (
    <div className="card-base overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
        <div className="h-full min-h-[220px] bg-ink-100">
          <img src={club.cover} alt={club.name} className="h-full w-full object-cover" />
        </div>

        <div className="p-6 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                <Tag>{club.category}</Tag>
                {club.tags?.map((tag) => (
                  <Tag key={tag} variant="muted">
                    {tag}
                  </Tag>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-ink-900">{club.name}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-600">
                {club.shortDescription}
              </p>
            </div>

            <div className="rounded-2xl bg-brand-500 px-4 py-3 text-center text-white shadow-md">
              <div className="text-xs opacity-90">匹配度</div>
              <div className="text-2xl font-bold">{club.matchScore}%</div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <div className="text-base font-bold text-ink-900">为什么推荐你</div>
              <div className="mt-3 space-y-3">
                {(club.dynamicReasons?.length ? club.dynamicReasons : club.matchReasons)
                  .slice(0, 3)
                  .map((reason) => (
                    <div
                      key={reason}
                      className="rounded-2xl bg-brand-50 px-4 py-3 text-sm leading-6 text-brand-700"
                    >
                      {reason}
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <div className="text-base font-bold text-ink-900">关键信息</div>
              <div className="mt-3 space-y-3 text-sm text-ink-600">
                <div className="rounded-2xl border border-ink-100 bg-ink-50 px-4 py-3">
                  活动频率：{club.activityFrequency}
                </div>
                <div className="rounded-2xl border border-ink-100 bg-ink-50 px-4 py-3">
                  招新方式：{club.recruitmentType}
                </div>
                <div className="rounded-2xl border border-ink-100 bg-ink-50 px-4 py-3">
                  截止时间：{club.deadline}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link to={`/clubs/${club.id}`} className="btn-primary">
              查看详情
            </Link>
            <button type="button" className="btn-secondary" onClick={() => onToggleFavorite(club.id)}>
              {isFavorite ? '已收藏' : '收藏社团'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendationCard