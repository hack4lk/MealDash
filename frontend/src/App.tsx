import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PredictionFormPage from './pages/PredictionFormPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f2937', // gray-800
            color: '#fff',
            border: '1px solid #374151', // gray-700
            fontSize: '14px',
            padding: '12px 16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          },
          success: {
            iconTheme: {
              primary: '#10b981', // green-500
              secondary: '#d1fae5', // green-100
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444', // red-500
              secondary: '#fee2e2', // red-100
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/predict"
          element={
            <ProtectedRoute>
              <PredictionFormPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
