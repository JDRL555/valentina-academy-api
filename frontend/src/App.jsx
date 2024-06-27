/* eslint-disable react/no-unknown-property */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState }                     from 'react'

import { ContextApp } from './context/ContextApp.jsx'

import HomePage                         from './pages/HomePage/HomePage.jsx'
import LandingPage                      from './pages/LandingPage/LandingPage.jsx'
import LoginPage                        from './pages/LoginPage/LoginPage.jsx'
import RegisterPage                     from './pages/RegisterPage/RegisterPage.jsx'
import CoursePage                       from './pages/CoursePage/Index.jsx'
import SurveyPage                       from './pages/SurveyPage/SurveyPage.jsx'
import NotFoundPage                     from './pages/NotFoundPage/NotFoundPage.jsx'

import AdminPage                        from './pages/AdminPage/AdminPage.jsx'
import UsersAdmin                       from './pages/admin/UsersAdmin/UsersAdmin.jsx'
import CoursesAdmin                     from './pages/admin/CoursesAdmin/CoursesAdmin.jsx'
import RecipesAdmin                     from './pages/admin/RecipesAdmin/RecipesAdmin.jsx'
import IngredientsAdmin                 from './pages/admin/IngredientsAdmin/IngredientsAdmin.jsx'


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
            path='/courses/admin'
            element={
              <IsAuthorized>
                <CoursesAdmin />
              </IsAuthorized>
            }
          />
          <Route 
            path='/users/admin'
            element={
              <IsAuthorized>
                <UsersAdmin />
              </IsAuthorized>
            }
          />
          <Route 
            path='/recipes/admin'
            element={
              <IsAuthorized>
                <RecipesAdmin />
              </IsAuthorized>
            }
          />
          <Route 
            path='/ingredients/admin'
            element={
              <IsAuthorized>
                <IngredientsAdmin />
              </IsAuthorized>
            }
          />
          <Route 
            path='/admin'
            element={
              <IsAuthorized>
                <AdminPage />
              </IsAuthorized>
            }
          />
        </Routes>
      </BrowserRouter>
    </ContextApp.Provider>
  )

}