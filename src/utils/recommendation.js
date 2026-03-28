export function calculateMatchScore(quiz, club) {
  let score = 55

  const interests = quiz.interests || []
  const goals = quiz.goals || []

  if (interests.includes(club.category)) score += 18

  if (interests.includes('技术创新') && club.name === 'AI创新社') score += 10
  if (interests.includes('商业创业') && club.name === '产品创新联盟') score += 10
  if (interests.includes('公益服务') && club.name === '青年志愿者协会') score += 10
  if (interests.includes('学术研究') && club.name === '数据科学社') score += 10
  if (interests.includes('艺术表达') && club.name === '街舞社') score += 8

  if (quiz.personality === '外向表达型' && ['校辩论队', '街舞社'].includes(club.name)) {
    score += 8
  }

  if (quiz.personality === '组织协调型' && ['产品创新联盟', '青年志愿者协会'].includes(club.name)) {
    score += 8
  }

  if (quiz.personality === '深度思考型' && ['数据科学社', 'AI创新社'].includes(club.name)) {
    score += 8
  }

  if (quiz.personality === '执行实践型' && ['AI创新社', '青年志愿者协会'].includes(club.name)) {
    score += 8
  }

  if (goals.includes('提升技能') && ['AI创新社', '数据科学社', '产品创新联盟'].includes(club.name)) {
    score += 8
  }

  if (goals.includes('参加比赛') && ['校辩论队', 'AI创新社'].includes(club.name)) {
    score += 6
  }

  if (goals.includes('交朋友') && ['青年志愿者协会', '街舞社'].includes(club.name)) {
    score += 6
  }

  if (goals.includes('丰富简历') && ['产品创新联盟', '数据科学社', 'AI创新社'].includes(club.name)) {
    score += 6
  }

  if (quiz.timeCommitment === '1-2小时' && ['青年志愿者协会'].includes(club.name)) score += 6
  if (quiz.timeCommitment === '3-4小时' && ['AI创新社', '产品创新联盟', '数据科学社'].includes(club.name)) score += 6
  if (quiz.timeCommitment === '5-6小时' && ['校辩论队', '街舞社'].includes(club.name)) score += 6
  if (quiz.timeCommitment === '6小时以上' && ['校辩论队'].includes(club.name)) score += 6

  if (quiz.pace === '轻松参与' && ['青年志愿者协会', '街舞社'].includes(club.name)) score += 5
  if (quiz.pace === '稳定活动' && ['数据科学社', '产品创新联盟'].includes(club.name)) score += 5
  if (quiz.pace === '高投入高成长' && ['AI创新社', '校辩论队'].includes(club.name)) score += 5

  return Math.min(score, 98)
}

export function generateReasons(quiz, club) {
  const reasons = []

  if ((quiz.interests || []).includes(club.category)) {
    reasons.push(`你的兴趣方向与“${club.name}”的核心活动高度匹配`)
  }

  if ((quiz.goals || []).includes('提升技能')) {
    reasons.push('你希望提升能力，这个社团能提供较清晰的成长路径')
  }

  if ((quiz.goals || []).includes('交朋友')) {
    reasons.push('你重视参与感与社交氛围，这个社团更容易帮助你融入校园')
  }

  if (quiz.timeCommitment) {
    reasons.push(`你的时间投入预期与该社团的活动节奏较为一致`)
  }

  if (quiz.personality === '外向表达型') {
    reasons.push('你的性格特点更适合有互动、展示和协作机会的社团场景')
  }

  return reasons.slice(0, 3)
}

export function getRecommendedClubs(quiz, clubs) {
  return clubs
    .map((club) => {
      const matchScore = calculateMatchScore(quiz, club)
      return {
        ...club,
        matchScore,
        dynamicReasons: generateReasons(quiz, club)
      }
    })
    .sort((a, b) => b.matchScore - a.matchScore)
}