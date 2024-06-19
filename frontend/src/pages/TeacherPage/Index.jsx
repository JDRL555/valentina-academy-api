import { useEffect, useState } from 'react'

import { fetchToApi } from '../../services/api'
import { BACKEND_ROUTES } from '../../constants/routes'

import TeacherPage from './TeacherPage'

export default function Index() {

  const [courses, setCourses] = useState([])
  
  useEffect(() => {
    async function getCourses() {
      const response = await fetchToApi(BACKEND_ROUTES.courses)
      setCourses(response)
    }
    getCourses()
  }, [])

  if(courses.length == 0) {
    return <h1>Cargando...</h1>
  }

  return (
    <TeacherPage courses={courses} />
  )
}
