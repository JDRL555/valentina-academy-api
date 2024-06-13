/* eslint-disable react/no-unknown-property */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState }                     from 'react'

import { ContextApp } from './context/ContextApp.jsx'

import HomePage                         from './pages/HomePage.jsx'
import LandingPage                      from './pages/LandingPage.jsx'
import NotFoundPage                     from './pages/NotFoundPage.jsx'
import LoginPage                        from './pages/LoginPage.jsx'
import RegisterPage                     from './pages/RegisterPage.jsx'
import CoursePage                       from './pages/CoursePage.jsx'
import SurveyPage                       from './pages/SurveyPage.jsx'

import IsAuthorized                     from './components/IsAuthorized.jsx'
import IsCourseCompleted                from './components/IsCourseCompleted.jsx'

import './styles/Global.css'

export default function App() {
  const [completed, setCompleted] = useState(false)
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    username: ""
  })

  return (
    <ContextApp.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={< NotFoundPage />} />
          <Route path="/" element={< LandingPage />} />
          <Route 
            path="/dashboard" 
            element={
              <IsAuthorized>
                <HomePage />
              </IsAuthorized>
            } 
          />
          <Route path="/login" element={< LoginPage />} />
          <Route path="/register" element={< RegisterPage />} />
          <Route 
            path='/course/:id' 
            element={
              <IsAuthorized>
                <CoursePage setCompleted={setCompleted} />
              </IsAuthorized>
            } 
          />
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
    </ContextApp.Provider>
  )

}