import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/business/Navbar'
import QuizOptionGroup from '../components/business/QuizOptionGroup'
import SectionHeader from '../components/common/SectionHeader'
import { saveQuizResult } from '../utils/storage'

const interestOptions = [
  '技术创新',
  '艺术表达',
  '体育运动',
  '公益服务',
  '学术研究',
  '商业创业',
  '媒体传播',
  '社交活动'
]

const personalityOptions = [
  '外向表达型',
  '组织协调型',
  '深度思考型',
  '执行实践型'
]

const timeOptions = ['1-2小时', '3-4小时', '5-6小时', '6小时以上']

const goalOptions = ['交朋友', '提升技能', '参加比赛', '丰富简历', '放松娱乐', '社会实践']

const paceOptions = ['轻松参与', '稳定活动', '高投入高成长']

function QuizPage() {
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState({
    interests: [],
    personality: '',
    timeCommitment: '',
    goals: [],
    pace: ''
  })

  const completedCount = useMemo(() => {
    let count = 0
    if (quiz.interests.length) count += 1
    if (quiz.personality) count += 1
    if (quiz.timeCommitment) count += 1
    if (quiz.goals.length) count += 1
    if (quiz.pace) count += 1
    return count
  }, [quiz])

  const handleSubmit = () => {
    saveQuizResult(quiz)
    navigate('/results')
  }

  const handleReset = () => {
    setQuiz({
      interests: [],
      personality: '',
      timeCommitment: '',
      goals: [],
      pace: ''
    })
  }

  return (
    <div className="page-shell">
      <Navbar />

      <main className="section-block">
        <div className="container-main grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionHeader
              eyebrow="智能测评"
              title="用 3 分钟，换来更清晰的社团选择"
              subtitle="根据你的兴趣、性格、时间投入和目标偏好，生成更适合你的个性化社团推荐。"
              align="left"
            />

            <div className="space-y-6">
              <QuizOptionGroup
                title="你更感兴趣的方向是？"
                subtitle="可多选，系统会优先考虑你的兴趣方向"
                options={interestOptions}
                value={quiz.interests}
                onChange={(value) => setQuiz((prev) => ({ ...prev, interests: value }))}
                multiple
              />

              <QuizOptionGroup
                title="你的性格倾向更接近哪一类？"
                subtitle="用于判断你更适合什么样的活动形式"
                options={personalityOptions}
                value={quiz.personality}
                onChange={(value) => setQuiz((prev) => ({ ...prev, personality: value }))}
              />

              <QuizOptionGroup
                title="你每周愿意投入多少时间？"
                subtitle="帮助匹配活动节奏更合适的社团"
                options={timeOptions}
                value={quiz.timeCommitment}
                onChange={(value) =>
                  setQuiz((prev) => ({ ...prev, timeCommitment: value }))
                }
              />

              <QuizOptionGroup
                title="你更希望通过社团获得什么？"
                subtitle="可多选，系统会结合你的成长目标进行推荐"
                options={goalOptions}
                value={quiz.goals}
                onChange={(value) => setQuiz((prev) => ({ ...prev, goals: value }))}
                multiple
              />

              <QuizOptionGroup
                title="你期待的社团节奏是？"
                subtitle="决定你更适合轻参与、稳定活动还是高投入成长型社团"
                options={paceOptions}
                value={quiz.pace}
                onChange={(value) => setQuiz((prev) => ({ ...prev, pace: value }))}
              />

              <div className="flex flex-wrap gap-4 pt-2">
                <button type="button" className="btn-secondary" onClick={handleReset}>
                  重置
                </button>
                <button type="button" className="btn-primary" onClick={handleSubmit}>
                  生成我的推荐结果
                </button>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card-base p-6">
              <div className="text-lg font-bold text-ink-900">当前完成度</div>
              <div className="mt-4 h-3 rounded-full bg-ink-100">
                <div
                  className="h-3 rounded-full bg-brand-500 transition-all"
                  style={{ width: `${(completedCount / 5) * 100}%` }}
                />
              </div>
              <div className="mt-3 text-sm text-ink-500">
                已完成 {completedCount} / 5 项
              </div>
            </div>

            <div className="card-base p-6">
              <div className="text-lg font-bold text-ink-900">匹配小贴士</div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-ink-600">
                <div>• 推荐不是唯一答案，而是帮助你先缩小选择范围。</div>
                <div>• 建议优先查看匹配度高且时间投入适合的社团。</div>
                <div>• 如果你还没想清楚，可以先收藏 2-3 个社团再比较。</div>
              </div>
            </div>

            <div className="card-base p-6">
              <div className="text-lg font-bold text-ink-900">推荐逻辑参考</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['兴趣方向', '性格特征', '时间投入', '成长目标', '活动节奏'].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full bg-ink-100 px-3 py-1 text-sm text-ink-600"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default QuizPage