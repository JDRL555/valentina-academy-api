import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage                      from './pages/LandingPage.jsx'
import NotFoundPage                     from './pages/NotFoundPage.jsx'
import LoginPage                        from './pages/LoginPage.jsx'
import RegisterPage                     from './pages/RegisterPage.jsx'
import './styles/Global.css'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< LandingPage />} />
        <Route path="*" element={< NotFoundPage />} />
        <Route path="/login" element={< LoginPage />} />
        <Route path="/register" element={< RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )

}