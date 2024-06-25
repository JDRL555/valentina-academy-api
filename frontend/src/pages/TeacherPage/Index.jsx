import { useEffect, useState } from 'react'

import { fetchToApi } from '@api'
import { BACKEND_ROUTES } from '@constants/routes'

import Navbar from '@components/Navbar/Navbar'

import CoursesAdmin from '@pages/CoursesAdmin/CoursesAdmin'

export default function Index() {

  const [courses, setCourses] = useState([])
  
  useEffect(() => {
    async function getCourses() {
      const response = await fetchToApi(BACKEND_ROUTES.courses)
      setCourses(response)
    }
    getCourses()
  }, [])

  return (
    <>
      <Navbar />
      <CoursesAdmin courses={courses} />
    </>
  )
}
