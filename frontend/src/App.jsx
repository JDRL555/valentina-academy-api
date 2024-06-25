/* eslint-disable react/no-unknown-property */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState }                     from 'react'

import { ContextApp } from './context/ContextApp.jsx'

import HomePage                         from './pages/HomePage/HomePage.jsx'
import LandingPage                      from './pages/LandingPage/LandingPage.jsx'
import NotFoundPage                     from './pages/NotFoundPage/NotFoundPage.jsx'
import LoginPage                        from './pages/LoginPage/LoginPage.jsx'
import RegisterPage                     from './pages/RegisterPage/RegisterPage.jsx'
import CoursePage                       from './pages/CoursePage/Index.jsx'
import SurveyPage                       from './pages/SurveyPage/SurveyPage.jsx'
import TeacherPage                      from './pages/TeacherPage/Index.jsx'

import IsAuthorized                     from './layouts/IsAuthorized/IsAuthorized.jsx'
import IsCourseCompleted                from './layouts/IsCourseCompleted/IsCourseCompleted.jsx'

import './styles/Global.css'

export default function App() {
  const [completed, setCompleted] = useState(false)
  const [user, setUser] = useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    username: ""
  })

  return (
    <ContextApp.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route 
            path="*" 
            element={< NotFoundPage />} 
          />
          <Route 
            path="/" 
            element={< LandingPage />} 
          />
          <Route 
            path="/dashboard" 
            element={
              <IsAuthorized>
                <HomePage />
              </IsAuthorized>
            } 
          />
          <Route 
            path="/login" 
            element={< LoginPage />} 
          />
          <Route 
            path="/register" 
            element={< RegisterPage />} 
          />
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
          <Route 
            path='/teacher'
            element={
              <IsAuthorized>
                <TeacherPage />
              </IsAuthorized>
            }
          />
        </Routes>
      </BrowserRouter>
    </ContextApp.Provider>
  )

}