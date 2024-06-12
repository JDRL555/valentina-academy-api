/* eslint-disable react/no-unknown-property */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState }                     from 'react'
import HomePage                         from './pages/HomePage.jsx'
import LandingPage                      from './pages/LandingPage.jsx'
import NotFoundPage                     from './pages/NotFoundPage.jsx'
import LoginPage                        from './pages/LoginPage.jsx'
import RegisterPage                     from './pages/RegisterPage.jsx'
import CoursePage                       from './pages/CoursePage.jsx'
import SurveyPage                       from './pages/SurveyPage.jsx'
import IsCourseCompleted                from './components/IsCourseCompleted.jsx'
import './styles/Global.css'

export default function App() {

  const [completed, setCompleted] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< HomePage />} />
        <Route path="*" element={< NotFoundPage />} />
        <Route path="/landing" element={< LandingPage />} />
        <Route path="/login" element={< LoginPage />} />
        <Route path="/register" element={< RegisterPage />} />
        <Route path='/course/:id' element={<CoursePage setCompleted={setCompleted} />} />
        <Route 
          path='/survey' 
          element={
            <IsCourseCompleted completed={completed}> 
              <SurveyPage /> 
            </IsCourseCompleted>
          }  
        />
      </Routes>
    </BrowserRouter>
  )

}