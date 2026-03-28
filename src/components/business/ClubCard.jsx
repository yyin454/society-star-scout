import { Link } from 'react-router-dom'
import Tag from '../common/Tag'

function ClubCard({ club, compact = false, mode = 'recommend' }) {
  const rightBadge =
    mode === 'browse'
      ? club.recruitStatus || '招新进行中'
      : `${club.matchScore}%`

  const badgeClass =
    mode === 'browse'
      ? 'bg-ink-100 text-ink-600'
      : 'bg-brand-500 text-white'

  return (
    <div className="card-base card-hover flex h-full flex-col overflow-hidden">
      <div className={`${compact ? 'h-44' : 'h-52'} overflow-hidden bg-ink-100`}>
        <img
          src={club.cover}
          alt={club.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-nowrap items-center gap-2 overflow-hidden">
          <Tag>{club.category}</Tag>
          {club.tags?.slice(0, 2).map((tag) => (
            <Tag key={tag} variant="muted">
              {tag}
            </Tag>
          ))}
        </div>

        <div className="mb-1">
          <h3
            className="text-[22px] font-bold leading-snug text-ink-900 md:text-[24px]"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '1.7em'
            }}
          >
            {club.name}
          </h3>
        </div>

        <div className="mb-1">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${badgeClass}`}
          >
            {rightBadge}
          </span>
        </div>

        <p
          className="text-sm leading-7 text-ink-600"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '5.25em'
          }}
        >
          {club.shortDescription}
        </p>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1 whitespace-nowrap text-sm text-ink-500">
              截止：{club.deadline}
            </div>
            <Link
              to={`/clubs/${club.id}`}
              className="btn-secondary shrink-0 whitespace-nowrap px-4 py-2"
            >
              查看详情
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClubCard