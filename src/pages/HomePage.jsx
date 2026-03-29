import { Link } from 'react-router-dom'
import Navbar from '../components/business/Navbar'
import SectionHeader from '../components/common/SectionHeader'
import ClubCard from '../components/business/ClubCard'
import { clubs, featuredClubIds } from '../data/clubs'

function FeatureCard({ title, description, index }) {
  return (
    <div className="card-base p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        {index}
      </div>
      <h3 className="text-xl font-bold text-ink-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-ink-600">{description}</p>
    </div>
  )
}

function HomePage() {
  const featuredClubs = clubs.filter((club) => featuredClubIds.includes(club.id))

  return (
    <div className="page-shell">
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80')"
            }}
          />
          <div className="absolute inset-0 bg-[rgba(15,23,42,0.42)]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(249,115,22,0.16),rgba(15,23,42,0.22))]" />

          <div className="container-main relative z-10 py-16 lg:py-20">
            <div className="max-w-5xl">
              <h1 className="max-w-6xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                找到真正适合你的
                <span className="text-brand-300">大学社团</span>
              </h1>

              <p className="mt-6 max-w-4xl text-lg font-semibold leading-8 text-white/90 sm:text-xl">
                3 分钟完成兴趣测评，快速获取专属推荐。看懂社团、精准匹配、一键报名，一步到位。
              </p>

              <p className="mt-4 text-base leading-7 text-white/75 sm:text-lg">
                让每一次选择，都更接近热爱。
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/quiz"
                  className="inline-flex items-center justify-center rounded-2xl bg-brand-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-brand-600"
                >
                  开始智能匹配
                </Link>
                <Link
                  to="/clubs"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  浏览全部社团
                </Link>
              </div>

              <div className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-card backdrop-blur">
                  <div className="text-sm text-white/70">覆盖社团方向</div>
                  <div className="mt-2 text-3xl font-bold text-white">8+</div>
                </div>
                <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-card backdrop-blur">
                  <div className="text-sm text-white/70">推荐解释维度</div>
                  <div className="mt-2 text-3xl font-bold text-white">5项</div>
                </div>
                <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-card backdrop-blur">
                  <div className="text-sm text-white/70">热门社团示例</div>
                  <div className="mt-2 text-3xl font-bold text-white">12个</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block bg-white">
          <div className="container-main">
            <SectionHeader
              eyebrow="社团星探 · 让每一次选择，都更接近热爱"
              title="发现适合你的社团，从未如此高效"
              subtitle="基于兴趣与偏好精准推荐，从浏览到报名全程追踪，不错过任何一个关键节点。"
            />

            <div className="grid gap-6 md:grid-cols-3">
              <FeatureCard
                index="01"
                title="发现 · 全景探索"
                description="社团方向、招新状态、活动节奏、截止时间 —— 关键信息聚合呈现，快速锁定目标。"
              />
              <FeatureCard
                index="02"
                title="匹配 · 智能推荐"
                description="基于兴趣、时间投入与个人偏好，生成专属社团推荐，告别盲目筛选。"
              />
              <FeatureCard
                index="03"
                title="管理 · 一站式跟进"
                description="收藏意向社团、统一管理报名进度，实时接收面试通知与节点提醒，让招新进程尽在掌握。"
              />
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="container-main">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <SectionHeader
                eyebrow="热门社团"
                title="本周高关注社团"
                subtitle="浏览当前最受关注的社团方向，快速感受校园活动生态。"
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

        <section className="section-block pt-0">
          <div className="container-main">
            <div className="overflow-hidden rounded-[2rem] bg-brand-500 px-8 py-10 text-white shadow-card sm:px-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-3xl font-bold leading-tight">
                    现在开始，找到更适合你的大学社团
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-orange-50 sm:text-base">
                    用更清晰的方式认识校园资源，把第一次社团选择做得更轻松一点。
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/quiz"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition hover:bg-orange-50"
                  >
                    立即开始测评
                  </Link>
                  <Link
                    to="/clubs"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/35 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
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