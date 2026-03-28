import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/business/Navbar'
import SectionHeader from '../components/common/SectionHeader'
import StatCard from '../components/common/StatCard'
import ClubCard from '../components/business/ClubCard'
import ReminderList from '../components/business/ReminderList'
import {
  clubs,
  mockApplications,
  mockFavorites,
  reminders
} from '../data/clubs'
import { getFavorites } from '../utils/storage'

function MyClubsPage() {
  const localFavorites = getFavorites()
  const mergedFavorites = [...new Set([...mockFavorites, ...localFavorites])]

  const favoriteClubs = useMemo(
    () => clubs.filter((club) => mergedFavorites.includes(club.id)),
    [mergedFavorites]
  )

  const appliedClubs = useMemo(
    () =>
      mockApplications.map((application) => {
        const club = clubs.find((item) => item.id === application.clubId)
        return {
          ...application,
          club
        }
      }),
    []
  )

  return (
    <div className="page-shell">
      <Navbar />

      <main className="section-block">
        <div className="container-main">
          <SectionHeader
            eyebrow="我的社团"
            title="统一管理你的收藏、报名和招新进度"
            subtitle="这里会展示你最近关注的社团动态，帮助你更清楚下一步该做什么。"
            align="left"
          />

          <div className="grid gap-6 md:grid-cols-3">
            <StatCard label="已收藏" value={favoriteClubs.length} hint="可继续比较与筛选" />
            <StatCard label="已报名" value={appliedClubs.length} hint="关注后续通知与进度" />
            <StatCard label="提醒事项" value={reminders.length} hint="建议优先处理截止提醒" />
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-8">
              <div>
                <div className="mb-5 text-2xl font-bold text-ink-900">已报名社团</div>
                {appliedClubs.length ? (
                  <div className="space-y-4">
                    {appliedClubs.map((item) => (
                      <div key={item.id} className="card-base p-6">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <div className="text-xl font-bold text-ink-900">{item.club?.name}</div>
                            <div className="mt-2 inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
                              当前状态：{item.status}
                            </div>
                          </div>
                          <div className="text-sm text-ink-500">更新时间：{item.updateTime}</div>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-ink-600">{item.note}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="card-base p-8 text-center">
                    <div className="text-lg font-bold text-ink-900">你还没有报名社团</div>
                    <p className="mt-3 text-sm text-ink-500">
                      可以先去社团广场逛一逛，或通过智能匹配找到更适合自己的社团。
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                      <Link to="/clubs" className="btn-secondary">
                        去社团广场
                      </Link>
                      <Link to="/quiz" className="btn-primary">
                        去做测评
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="mb-5 text-2xl font-bold text-ink-900">我的收藏</div>
                {favoriteClubs.length ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {favoriteClubs.map((club) => (
                      <ClubCard key={club.id} club={club} compact mode="browse" />
                    ))}
                  </div>
                ) : (
                  <div className="card-base p-8 text-center">
                    <div className="text-lg font-bold text-ink-900">你还没有收藏社团</div>
                    <p className="mt-3 text-sm text-ink-500">
                      可以先浏览全部社团，看到感兴趣的内容后再加入收藏。
                    </p>
                    <div className="mt-6">
                      <Link to="/clubs" className="btn-primary">
                        去社团广场看看
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="mb-5 text-2xl font-bold text-ink-900">提醒事项</div>
              <ReminderList items={reminders} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MyClubsPage