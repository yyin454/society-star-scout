import { Link } from 'react-router-dom'
import Navbar from '../components/business/Navbar'
import SectionHeader from '../components/common/SectionHeader'
import Tag from '../components/common/Tag'

function ResultsGuidePage() {
  return (
    <div className="page-shell">
      <Navbar />

      <main>
        <section className="gradient-hero hero-grid border-b border-white/70">
          <div className="container-main grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex flex-wrap gap-3">
                <Tag>推荐结果</Tag>
                <Tag variant="muted">测评引导</Tag>
                <Tag variant="muted">个性化匹配</Tag>
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
                先完成测评，
                <span className="text-brand-600">再查看更适合你的社团推荐</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-600">
                为了让推荐结果更有针对性，我们会结合你的兴趣方向、性格倾向、
                时间投入和成长目标，生成更适合你的社团匹配结果。
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/quiz" className="btn-primary">
                  立即开始测评
                </Link>
                <Link to="/" className="btn-secondary">
                  返回首页
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-full space-y-4">
                <div className="card-base p-6">
                  <div className="text-lg font-bold text-ink-900">为什么需要先测评？</div>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-ink-600">
                    <div>• 不同社团的活动节奏和投入要求差异很大</div>
                    <div>• 你适合“热闹型社团”还是“成长型社团”，需要先判断</div>
                    <div>• 推荐结果会附带解释，帮助你更快做决定</div>
                  </div>
                </div>

                <div className="card-base p-6">
                  <div className="text-lg font-bold text-ink-900">完成测评后你将获得</div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-brand-50 px-4 py-4 text-sm text-brand-700">
                      个性化画像标签
                    </div>
                    <div className="rounded-2xl bg-brand-50 px-4 py-4 text-sm text-brand-700">
                      高匹配社团推荐
                    </div>
                    <div className="rounded-2xl bg-brand-50 px-4 py-4 text-sm text-brand-700">
                      推荐理由解释
                    </div>
                    <div className="rounded-2xl bg-brand-50 px-4 py-4 text-sm text-brand-700">
                      收藏与后续比较建议
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block bg-white">
          <div className="container-main">
            <SectionHeader
              eyebrow="推荐逻辑"
              title="系统会从哪些维度为你生成推荐？"
              subtitle="不是简单按热度排序，而是尽量根据你的真实偏好去匹配更合适的社团。"
            />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {[
                {
                  title: '兴趣方向',
                  desc: '判断你更偏向技术、艺术、公益、学术还是商业实践。'
                },
                {
                  title: '性格倾向',
                  desc: '识别你更适合表达型、组织型、思考型还是执行型活动场景。'
                },
                {
                  title: '时间投入',
                  desc: '避免推荐节奏明显不适合你的社团。'
                },
                {
                  title: '目标偏好',
                  desc: '看你更想交朋友、提升技能、参加比赛还是丰富简历。'
                },
                {
                  title: '社团节奏',
                  desc: '匹配你更适合轻参与、稳定活动还是高投入成长型社团。'
                }
              ].map((item) => (
                <div key={item.title} className="card-base card-hover p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    ✦
                  </div>
                  <div className="text-lg font-bold text-ink-900">{item.title}</div>
                  <p className="mt-3 text-sm leading-7 text-ink-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block pt-0">
          <div className="container-main">
            <div className="card-base overflow-hidden bg-gradient-to-r from-brand-500 to-brand-600 p-8 text-white sm:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-3xl font-bold">还没开始没关系，现在测评也不晚</div>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-orange-50 sm:text-base">
                    只需要几分钟，你就能获得一份更有解释性的社团推荐结果。
                  </p>
                </div>
                <div>
                  <Link
                    to="/quiz"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition hover:bg-orange-50"
                  >
                    去做测评
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

export default ResultsGuidePage