import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PredictionFormPage from './pages/PredictionFormPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/predict" element={
          <ProtectedRoute>
            <PredictionFormPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
