import { useMemo, useState } from 'react'
import Navbar from '../components/business/Navbar'
import SectionHeader from '../components/common/SectionHeader'
import Tag from '../components/common/Tag'
import {
  getRecruiterState,
  markCandidatePendingNotice,
  rejectCandidate,
  sendInterviewNotice,
  markCandidateInterviewed,
  passCandidate,
  updateRecruiterState
} from '../utils/recruiterStorage'

function RecruiterCard({ title, description, children }) {
  return (
    <div className="card-base p-6">
      <div className="text-xl font-bold text-ink-900">{title}</div>
      <p className="mt-3 text-sm leading-7 text-ink-600">{description}</p>
      <div className="mt-5">{children}</div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-ink-50 px-4 py-4 text-sm text-ink-700">
      <span className="font-medium text-ink-600">{label}</span>
      <span className="ml-2">{value}</span>
    </div>
  )
}

function CandidateCard({
  candidate,
  onOpen,
  onReject,
  onPendingNotice,
  onInterviewed,
  onPass
}) {
  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-bold text-ink-900">{candidate.name}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {candidate.tags.map((tag) => (
              <Tag key={tag} variant="muted">
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-brand-500 px-4 py-2 text-center text-white">
          <div className="text-xs opacity-90">匹配度</div>
          <div className="text-xl font-bold">{candidate.score}%</div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-ink-600">{candidate.summary}</p>

      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="rounded-full bg-ink-100 px-3 py-1 text-sm font-medium text-ink-600">
          {candidate.status}
        </span>

        <div className="flex flex-wrap justify-end gap-3">
          <button type="button" className="btn-secondary" onClick={() => onOpen(candidate)}>
            查看详情
          </button>

          {candidate.status === '待初筛' ? (
            <>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => onReject(candidate.id)}
              >
                不通过
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => onPendingNotice(candidate.id)}
              >
                进入待通知
              </button>
            </>
          ) : null}

          {candidate.status === '待面试' ? (
            <button
              type="button"
              className="btn-primary"
              onClick={() => onInterviewed(candidate.id)}
            >
              已面试
            </button>
          ) : null}

          {candidate.status === '已面试' ? (
            <>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => onReject(candidate.id)}
              >
                不通过
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => onPass(candidate.id)}
              >
                面试通过
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function DetailModal({ candidate, onClose }) {
  if (!candidate) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/35 p-4">
      <div className="w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-2xl font-bold text-ink-900">{candidate.name}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {candidate.tags.map((tag) => (
                <Tag key={tag} variant="muted">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>

          <button type="button" className="btn-secondary" onClick={onClose}>
            关闭
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-ink-100 bg-ink-50 px-4 py-4 text-sm text-ink-600">
            当前状态：{candidate.status}
          </div>
          <div className="rounded-2xl border border-ink-100 bg-ink-50 px-4 py-4 text-sm text-ink-600">
            匹配度：{candidate.score}%
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-ink-100 bg-ink-50 px-4 py-4 text-sm leading-7 text-ink-600">
          {candidate.summary}
        </div>
      </div>
    </div>
  )
}

function RecruiterPage() {
  const [state, setState] = useState(getRecruiterState())
  const [selectedCandidate, setSelectedCandidate] = useState(null)

  const { clubInfo, interviewNotice, candidates, members } = state

  const stats = useMemo(() => {
    const waitingScreen = candidates.filter((item) => item.status === '待初筛').length
    const waitingNotice = candidates.filter((item) => item.status === '待通知').length
    const waitingInterview = candidates.filter((item) => item.status === '待面试').length

    return {
      total: candidates.length,
      waitingScreen,
      waitingNotice,
      waitingInterview
    }
  }, [candidates])

  const refresh = (next) => setState(next)

  const handleInterviewInputChange = (field, value) => {
    const next = updateRecruiterState((prev) => ({
      ...prev,
      interviewNotice: {
        ...prev.interviewNotice,
        [field]: value
      }
    }))
    refresh(next)
  }

  const handleSendNotice = () => {
    refresh(sendInterviewNotice())
  }

  return (
    <div className="page-shell">
      <Navbar />
      <DetailModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />

      <main>
        <section className="section-block bg-white">
          <div className="container-main">
            <SectionHeader
              eyebrow="社团端示意页"
              title="围绕招新流程的最小化管理入口"
              subtitle="统一维护社团信息、候选人筛选、面试通知和成员管理，让招新流程更顺。"
              align="left"
            />

            <div className="grid gap-6 md:grid-cols-4">
              <div className="card-base p-6">
                <div className="text-sm text-ink-500">当前候选人</div>
                <div className="mt-2 text-3xl font-bold text-ink-900">{stats.total}</div>
              </div>
              <div className="card-base p-6">
                <div className="text-sm text-ink-500">待初筛</div>
                <div className="mt-2 text-3xl font-bold text-ink-900">{stats.waitingScreen}</div>
              </div>
              <div className="card-base p-6">
                <div className="text-sm text-ink-500">待通知</div>
                <div className="mt-2 text-3xl font-bold text-ink-900">{stats.waitingNotice}</div>
              </div>
              <div className="card-base p-6">
                <div className="text-sm text-ink-500">待面试</div>
                <div className="mt-2 text-3xl font-bold text-ink-900">{stats.waitingInterview}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="container-main grid gap-6 lg:grid-cols-2">
            <RecruiterCard
              title="我的社团信息"
              description="先把社团介绍、招新岗位和活动节奏维护清楚，学生端看到的信息会更完整。"
            >
              <div className="space-y-3 text-sm text-ink-600">
                <InfoRow label="社团名称：" value={clubInfo.name} />
                <InfoRow label="社团标语：" value={clubInfo.slogan} />
                <div className="rounded-2xl border border-ink-100 bg-ink-50 px-4 py-4 text-sm text-ink-700">
                  <span className="font-medium text-ink-600">社团简介：</span>
                  <p className="mt-2 leading-7 text-ink-600">{clubInfo.intro}</p>
                </div>
                <InfoRow label="招新岗位：" value={clubInfo.recruitRoles.join(' / ')} />
                <InfoRow label="活动频率：" value={clubInfo.activityFrequency} />
                <InfoRow label="截止时间：" value={clubInfo.recruitDeadline} />
                <InfoRow label="活动地点：" value={clubInfo.location} />
              </div>

              <div className="mt-5">
                <button type="button" className="btn-primary">
                  更新社团信息
                </button>
              </div>
            </RecruiterCard>

            <RecruiterCard
              title="统一发送面试通知"
              description="把面试安排、进度更新和统一通知放到一个入口里，不需要反复切换群聊和表单。"
            >
              <div className="space-y-3">
                <div>
                  <div className="mb-2 text-sm font-medium text-ink-600">面试时间</div>
                  <input
                    className="w-full rounded-2xl border border-ink-100 bg-ink-50 px-4 py-4 text-sm text-ink-700 outline-none"
                    value={interviewNotice.time}
                    onChange={(e) => handleInterviewInputChange('time', e.target.value)}
                    placeholder="例如：2026-09-23 19:00"
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm font-medium text-ink-600">面试地点</div>
                  <input
                    className="w-full rounded-2xl border border-ink-100 bg-ink-50 px-4 py-4 text-sm text-ink-700 outline-none"
                    value={interviewNotice.location}
                    onChange={(e) => handleInterviewInputChange('location', e.target.value)}
                    placeholder="例如：综合楼 A203"
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm font-medium text-ink-600">通知对象</div>
                  <input
                    className="w-full rounded-2xl border border-ink-100 bg-ink-50 px-4 py-4 text-sm text-ink-700 outline-none"
                    value={interviewNotice.targetText}
                    onChange={(e) => handleInterviewInputChange('targetText', e.target.value)}
                    placeholder="例如：进入初筛的同学"
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm font-medium text-ink-600">通知方式</div>
                  <input
                    className="w-full rounded-2xl border border-ink-100 bg-ink-50 px-4 py-4 text-sm text-ink-700 outline-none"
                    value={interviewNotice.method}
                    onChange={(e) => handleInterviewInputChange('method', e.target.value)}
                    placeholder="例如：站内提醒 + 邮件提醒"
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm font-medium text-ink-600">补充说明</div>
                  <textarea
                    className="min-h-[108px] w-full rounded-2xl border border-ink-100 bg-ink-50 px-4 py-4 text-sm text-ink-700 outline-none"
                    value={interviewNotice.note}
                    onChange={(e) => handleInterviewInputChange('note', e.target.value)}
                    placeholder="例如：请提前 10 分钟到场，准备 1 分钟自我介绍。"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button type="button" className="btn-primary" onClick={handleSendNotice}>
                  发送面试通知
                </button>
                {interviewNotice.sentAt ? (
                  <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700">
                    最近发送：{interviewNotice.sentAt}
                  </span>
                ) : null}
              </div>
            </RecruiterCard>
          </div>
        </section>

        <section className="section-block bg-white">
          <div className="container-main">
            <SectionHeader
              eyebrow="候选人管理"
              title="先看画像，再决定下一步怎么推进"
              subtitle="候选人的状态会随着你的操作变化：待初筛 → 待通知 → 待面试 → 已面试。"
              align="left"
            />

            <div className="grid gap-6 lg:grid-cols-3">
              {candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onOpen={setSelectedCandidate}
                  onReject={(id) => refresh(rejectCandidate(id))}
                  onPendingNotice={(id) => refresh(markCandidatePendingNotice(id))}
                  onInterviewed={(id) => refresh(markCandidateInterviewed(id))}
                  onPass={(id) => refresh(passCandidate(id))}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="container-main">
            <SectionHeader
              eyebrow="社团成员"
              title="本社团成员池"
              subtitle="通过面试的同学会进入成员池，后续可以继续分配角色。"
              align="left"
            />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {members.map((member) => (
                <div key={member.id} className="card-base p-6">
                  <div className="text-xl font-bold text-ink-900">{member.name}</div>
                  <div className="mt-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
                    {member.role}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {member.tags.map((tag) => (
                      <Tag key={tag} variant="muted">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default RecruiterPage