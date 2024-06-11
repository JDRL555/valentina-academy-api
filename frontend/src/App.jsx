import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage                         from './pages/HomePage.jsx'
import LandingPage                      from './pages/LandingPage.jsx'
import NotFoundPage                     from './pages/NotFoundPage.jsx'
import LoginPage                        from './pages/LoginPage.jsx'
import RegisterPage                     from './pages/RegisterPage.jsx'
import CoursePage                       from './pages/CoursePage.jsx'
import SurveyPage                       from './pages/SurveyPage.jsx'
import './styles/Global.css'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< HomePage />} />
        <Route path="*" element={< NotFoundPage />} />
        <Route path="/landing" element={< LandingPage />} />
        <Route path="/login" element={< LoginPage />} />
        <Route path="/register" element={< RegisterPage />} />
        <Route path='/course/:id' element={<CoursePage />} />
        <Route path='/survey' element={<SurveyPage />} />
      </Routes>
    </BrowserRouter>
  )

}