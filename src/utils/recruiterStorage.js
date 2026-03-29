const STORAGE_KEY = 'society-star-scout-recruiter-state'

const defaultState = {
  clubInfo: {
    id: 'ai-innovation-club',
    name: 'AI创新社',
    slogan: '聚焦 AI 应用实践、项目协作与技能成长',
    intro:
      '面向对 AI 应用、项目实践和校园创新感兴趣的同学，社团主要围绕项目制活动、分享交流和技能成长展开。',
    recruitRoles: ['项目组', '内容组', '运营组'],
    activityFrequency: '每周 1 次例会 + 项目协作',
    recruitDeadline: '2026-09-21',
    location: '图书馆创客空间 / 线上协作'
  },
  interviewNotice: {
    time: '2026-09-23 19:00',
    location: '综合楼 A203',
    targetText: '进入初筛的同学',
    method: '站内提醒 + 邮件提醒',
    note: '请提前 10 分钟到场，准备 1 分钟自我介绍。',
    sentAt: ''
  },
  candidates: [
    {
      id: 'cand-1',
      name: '李同学',
      score: 92,
      tags: ['技术创新', '每周3-4小时', '提升技能'],
      summary: '更偏向项目制和技能成长型社团，活动节奏与 AI 创新社较匹配，报名意愿较高。',
      status: '待初筛'
    },
    {
      id: 'cand-2',
      name: '王同学',
      score: 88,
      tags: ['表达思辨', '外向表达型', '参加比赛'],
      summary: '表达欲较强，更适合互动性和展示机会较多的社团，目前也对 AI 创新方向保持兴趣。',
      status: '待通知'
    },
    {
      id: 'cand-3',
      name: '陈同学',
      score: 85,
      tags: ['技术创新', '轻松参与', '交朋友'],
      summary: '偏向先从轻量参与开始，更适合先体验活动，再逐步投入项目协作。',
      status: '待面试'
    },
    {
      id: 'cand-4',
      name: '赵同学',
      score: 81,
      tags: ['技术创新', '深度思考型', '丰富简历'],
      summary: '对 AI 学习方向比较明确，愿意持续投入时间，适合进入进一步沟通阶段。',
      status: '已面试'
    }
  ],
  members: [
    {
      id: 'mem-1',
      name: '周同学',
      role: '社长',
      tags: ['项目管理', '组织协调']
    },
    {
      id: 'mem-2',
      name: '孙同学',
      role: '副社长',
      tags: ['内容策划', '活动执行']
    },
    {
      id: 'mem-3',
      name: '吴同学',
      role: '项目组成员',
      tags: ['模型应用', '前端协作']
    }
  ]
}

function safeParse(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export function getRecruiterState() {
  const raw = localStorage.getItem(STORAGE_KEY)
  const parsed = raw ? safeParse(raw) : null
  if (!parsed) return defaultState
  return {
    ...defaultState,
    ...parsed,
    clubInfo: { ...defaultState.clubInfo, ...(parsed.clubInfo || {}) },
    interviewNotice: {
      ...defaultState.interviewNotice,
      ...(parsed.interviewNotice || {})
    },
    candidates: parsed.candidates || defaultState.candidates,
    members: parsed.members || defaultState.members
  }
}

export function saveRecruiterState(nextState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState))
}

export function updateRecruiterState(updater) {
  const current = getRecruiterState()
  const next = updater(current)
  saveRecruiterState(next)
  return next
}

export function markCandidatePendingNotice(candidateId) {
  return updateRecruiterState((state) => ({
    ...state,
    candidates: state.candidates.map((candidate) =>
      candidate.id === candidateId
        ? { ...candidate, status: '待通知' }
        : candidate
    )
  }))
}

export function rejectCandidate(candidateId) {
  return updateRecruiterState((state) => ({
    ...state,
    candidates: state.candidates.filter((candidate) => candidate.id !== candidateId)
  }))
}

export function sendInterviewNotice() {
  return updateRecruiterState((state) => ({
    ...state,
    interviewNotice: {
      ...state.interviewNotice,
      sentAt: new Date().toLocaleString('zh-CN', { hour12: false })
    },
    candidates: state.candidates.map((candidate) =>
      candidate.status === '待通知'
        ? { ...candidate, status: '待面试' }
        : candidate
    )
  }))
}

export function markCandidateInterviewed(candidateId) {
  return updateRecruiterState((state) => ({
    ...state,
    candidates: state.candidates.map((candidate) =>
      candidate.id === candidateId
        ? { ...candidate, status: '已面试' }
        : candidate
    )
  }))
}

export function passCandidate(candidateId) {
  return updateRecruiterState((state) => {
    const target = state.candidates.find((candidate) => candidate.id === candidateId)
    if (!target) return state

    return {
      ...state,
      candidates: state.candidates.filter((candidate) => candidate.id !== candidateId),
      members: [
        ...state.members,
        {
          id: `mem-${Date.now()}`,
          name: target.name,
          role: '新成员',
          tags: target.tags.slice(0, 2)
        }
      ]
    }
  })
}