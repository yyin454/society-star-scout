import { Link } from 'react-router-dom'
import Navbar from '../components/business/Navbar'
import SectionHeader from '../components/common/SectionHeader'
import ClubCard from '../components/business/ClubCard'
import Tag from '../components/common/Tag'
import { clubs, featuredClubIds, profileHighlights } from '../data/clubs'

function HomePage() {
  const featuredClubs = clubs.filter((club) => featuredClubIds.includes(club.id))

  return (
    <div className="page-shell">
      <Navbar />

      <main>
        <section className="gradient-hero hero-grid overflow-hidden border-b border-white/70">
          <div className="container-main grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex flex-wrap gap-3">
                <Tag>新生友好</Tag>
                <Tag variant="muted">智能推荐</Tag>
                <Tag variant="muted">一站式决策</Tag>
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
                找到真正适合你的
                <span className="text-brand-600">大学社团</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-600">
                3 分钟完成兴趣测评，获取个性化社团推荐。少走弯路，不再盲目加群，
                更快找到真正适合你的校园归属感。
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/quiz" className="btn-primary">
                  开始智能匹配
                </Link>
                <Link to="/clubs" className="btn-secondary">
                  浏览全部社团
                </Link>
              </div>

              <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
                <div className="card-base p-4">
                  <div className="text-sm text-ink-500">覆盖社团方向</div>
                  <div className="mt-2 text-2xl font-bold text-ink-900">8+</div>
                </div>
                <div className="card-base p-4">
                  <div className="text-sm text-ink-500">推荐解释维度</div>
                  <div className="mt-2 text-2xl font-bold text-ink-900">5项</div>
                </div>
                <div className="card-base p-4">
                  <div className="text-sm text-ink-500">热门社团示例</div>
                  <div className="mt-2 text-2xl font-bold text-ink-900">12个</div>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="w-full max-w-xl space-y-4">
                <div className="card-base p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-ink-900">你的画像标签</div>
                      <div className="mt-1 text-sm text-ink-500">
                        基于兴趣、性格与时间投入生成
                      </div>
                    </div>
                    <span className="rounded-full bg-brand-500 px-3 py-1 text-sm font-semibold text-white">
                      AI分析中
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['技术创新', '外向表达型', '每周3-4小时', '提升技能', '参加比赛'].map(
                      (item) => (
                        <Tag key={item}>{item}</Tag>
                      )
                    )}
                  </div>
                </div>

                <div className="card-base space-y-4 p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-ink-900">推荐结果预览</div>
                    <div className="text-sm text-ink-500">高匹配社团</div>
                  </div>

                  {[
                    ['AI创新社', '92%'],
                    ['产品创新联盟', '90%'],
                    ['校辩论队', '89%']
                  ].map(([name, score]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between rounded-2xl border border-ink-100 bg-ink-50/80 px-4 py-4"
                    >
                      <div>
                        <div className="font-semibold text-ink-900">{name}</div>
                        <div className="mt-1 text-sm text-ink-500">
                          推荐理由清晰 · 活动节奏匹配 · 新生友好
                        </div>
                      </div>
                      <div className="rounded-full bg-brand-500 px-3 py-1 text-sm font-semibold text-white">
                        {score}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="container-main">
            <SectionHeader
              eyebrow="核心价值"
              title="不只是推荐社团，更是在帮你做决定"
              subtitle="从信息筛选、个性匹配到收藏与报名，把新生选社团这件事做得更简单。"
            />

            <div className="grid gap-6 md:grid-cols-3">
              {profileHighlights.map((item) => (
                <div key={item.title} className="card-base card-hover p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    ✦
                  </div>
                  <h3 className="text-xl font-bold text-ink-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="featured-clubs" className="section-block bg-white">
          <div className="container-main">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <SectionHeader
                eyebrow="热门社团"
                title="本周高关注社团"
                subtitle="先看看当前最受新生关注的社团方向，快速感受校园活动生态。"
                align="left"
              />
              <Link to="/clubs" className="btn-secondary">
                查看全部社团
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredClubs.map((club) => (
                <ClubCard key={club.id} club={club} compact mode="browse" />
              ))}
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="container-main">
            <SectionHeader
              eyebrow="场景痛点"
              title="为什么新生选社团总是很纠结？"
              subtitle="问题不在于社团不够多，而在于信息太散、比较太难、判断成本太高。"
            />

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="card-base p-8">
                <div className="mb-5 text-2xl font-bold text-ink-900">传统方式</div>
                <div className="space-y-4 text-sm leading-7 text-ink-600">
                  <div>• 信息分散，到处加群翻通知，社团资料新旧不一</div>
                  <div>• 社团太多，不知道该先看哪个，也不知道自己适合哪个</div>
                  <div>• 看完介绍还是难以判断是否值得投入时间</div>
                  <div>• 报名时间、面试通知容易错过，反复切换渠道很麻烦</div>
                </div>
              </div>

              <div className="card-base p-8">
                <div className="mb-5 text-2xl font-bold text-ink-900">社团星探</div>
                <div className="space-y-4 text-sm leading-7 text-ink-600">
                  <div>• 一次测评，快速锁定更适合你的社团方向</div>
                  <div>• 推荐结果自带解释，不只是告诉你“推荐了什么”</div>
                  <div>• 核心信息集中展示，便于收藏、比较和继续决策</div>
                  <div>• 把报名、提醒和进度统一管理，减少来回切换成本</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block pt-0">
          <div className="container-main">
            <div className="card-base overflow-hidden bg-gradient-to-r from-brand-500 to-brand-600 p-8 text-white sm:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-3xl font-bold">现在开始，找到更适合你的大学社团</div>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-orange-50 sm:text-base">
                    用更清晰的方式认识校园资源，把第一次社团选择做得更轻松一点。
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/quiz"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition hover:bg-orange-50"
                  >
                    立即开始测评
                  </Link>
                  <Link
                    to="/clubs"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    先逛逛社团广场
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage