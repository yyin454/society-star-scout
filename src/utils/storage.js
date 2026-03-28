const QUIZ_KEY = 'society_star_scout_quiz'
const FAVORITES_KEY = 'society_star_scout_favorites'

export function getQuizResult() {
  const raw = localStorage.getItem(QUIZ_KEY)
  return raw ? JSON.parse(raw) : null
}

export function saveQuizResult(data) {
  localStorage.setItem(QUIZ_KEY, JSON.stringify(data))
}

export function clearQuizResult() {
  localStorage.removeItem(QUIZ_KEY)
}

export function getFavorites() {
  const raw = localStorage.getItem(FAVORITES_KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveFavorites(data) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(data))
}

export function toggleFavorite(clubId) {
  const favorites = getFavorites()
  const exists = favorites.includes(clubId)
  const next = exists
    ? favorites.filter((id) => id !== clubId)
    : [...favorites, clubId]

  saveFavorites(next)
  return next
}

export function isFavorite(clubId) {
  return getFavorites().includes(clubId)
}