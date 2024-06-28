/* eslint-disable react/no-unknown-property */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState }                     from 'react'

import { ROLES }                        from './constants/roles.js'

import { ContextApp }                   from './context/ContextApp.jsx'

import HomePage                         from './pages/HomePage/Index.jsx'
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
import HasPermissions                   from './layouts/HasPermissions/HasPermissions.jsx'
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
                <HasPermissions role={ROLES}>
                  <HomePage />
                </HasPermissions>
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
                <HasPermissions role={"student"}>
                  <CoursePage setCompleted={setCompleted} />
                </HasPermissions>
              </IsAuthorized>
            } 
          />
          <Route 
            path='/survey' 
            element={
              <IsAuthorized>
                <HasPermissions role={"student"}>
                  <IsCourseCompleted completed={completed}> 
                    <SurveyPage /> 
                  </IsCourseCompleted>
                </HasPermissions>
              </IsAuthorized>
            }  
          />
          <Route 
            path='/courses/admin'
            element={
              <IsAuthorized>
                <HasPermissions role={["teacher", "admin"]}>
                  <CoursesAdmin />
                </HasPermissions>
              </IsAuthorized>
            }
          />
          <Route 
            path='/users/admin'
            element={
              <IsAuthorized>
                <HasPermissions role={"admin"}>
                  <UsersAdmin />
                </HasPermissions>
              </IsAuthorized>
            }
          />
          <Route 
            path='/recipes/admin'
            element={
              <IsAuthorized>
                <HasPermissions role={"admin"}>
                  <RecipesAdmin />
                </HasPermissions>
              </IsAuthorized>
            }
          />
          <Route 
            path='/ingredients/admin'
            element={
              <IsAuthorized>
                <HasPermissions role={"admin"}>
                  <IngredientsAdmin />
                </HasPermissions>
              </IsAuthorized>
            }
          />
          <Route 
            path='/admin'
            element={
              <IsAuthorized>
                <HasPermissions role={"admin"}>
                  <AdminPage />
                </HasPermissions>
              </IsAuthorized>
            }
          />
        </Routes>
      </BrowserRouter>
    </ContextApp.Provider>
  )

}