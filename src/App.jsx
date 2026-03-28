import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ClubsPage from './pages/ClubsPage'
import QuizPage from './pages/QuizPage'
import ResultsPage from './pages/ResultsPage'
import ResultsGuidePage from './pages/ResultsGuidePage'
import ClubDetailPage from './pages/ClubDetailPage'
import MyClubsPage from './pages/MyClubsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/clubs" element={<ClubsPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/results-guide" element={<ResultsGuidePage />} />
      <Route path="/clubs/:id" element={<ClubDetailPage />} />
      <Route path="/my-clubs" element={<MyClubsPage />} />
    </Routes>
  )
}

export default App