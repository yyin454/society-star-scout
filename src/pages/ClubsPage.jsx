import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/business/Navbar'
import SectionHeader from '../components/common/SectionHeader'
import ClubCard from '../components/business/ClubCard'
import { clubs } from '../data/clubs'

const categoryOptions = [
  '全部',
  '技术创新',
  '表达思辨',
  '公益服务',
  '学术研究',
  '商业创业',
  '艺术表达'
]

function ClubsPage() {
  const [activeCategory, setActiveCategory] = useState('全部')

  const filteredClubs = useMemo(() => {
    if (activeCategory === '全部') return clubs
    return clubs.filter((club) => club.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="page-shell">
      <Navbar />

      <main className="section-block">
        <div className="container-main">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <SectionHeader
              eyebrow="社团广场"
              title="先逛一逛全部社团，再决定加入哪个"
              subtitle="如果你还不想立刻做测评，也可以先浏览不同方向的社团，看看哪些内容更吸引你。"
              align="left"
            />

            <div className="flex flex-wrap gap-3">
              <Link to="/quiz" className="btn-primary">
                去做智能匹配
              </Link>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-3">
            {categoryOptions.map((category) => {
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`chip-option ${isActive ? 'chip-option-active' : ''}`}
                >
                  {category}
                </button>
              )
            })}
          </div>

          <div className="mb-8 text-sm text-ink-500">
            {activeCategory === '全部'
              ? `当前共 ${filteredClubs.length} 个社团`
              : `当前分类“${activeCategory}”下共 ${filteredClubs.length} 个社团`}
          </div>

          {filteredClubs.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredClubs.map((club) => (
                <ClubCard
                  key={club.id}
                  club={club}
                  compact
                  mode="browse"
                />
              ))}
            </div>
          ) : (
            <div className="card-base p-10 text-center">
              <div className="text-xl font-bold text-ink-900">当前分类暂无社团</div>
              <p className="mt-3 text-sm text-ink-500">
                可以切换到“全部”查看更多内容，或直接去做智能匹配。
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setActiveCategory('全部')}
                >
                  查看全部
                </button>
                <Link to="/quiz" className="btn-primary">
                  去做测评
                </Link>
              </div>
            </div>
          )}

          <div className="mt-12">
            <div className="card-base overflow-hidden bg-gradient-to-r from-brand-500 to-brand-600 p-8 text-white sm:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-3xl font-bold">还没想清楚适合什么社团？</div>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-orange-50 sm:text-base">
                    试试智能匹配。系统会根据你的兴趣、性格和投入时间，给出更有解释性的推荐结果。
                  </p>
                </div>
                <div>
                  <Link
                    to="/quiz"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition hover:bg-orange-50"
                  >
                    开始测评
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ClubsPage