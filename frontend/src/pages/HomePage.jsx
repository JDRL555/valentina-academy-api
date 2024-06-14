import { useState, useEffect } from 'react'

import { BACKEND_ROUTES } from '../constants/routes.js'

import { fetchToApi } from '../services/api.js'

import Navbar         from '../components/Navbar.jsx'
import Header         from "../components/Header.jsx"
import Footer         from "../components/Footer.jsx"
import Courses        from "../components/Courses.jsx"
import Course         from "../components/Course.jsx"

import CourseSkeleton from '../components/CourseSkeleton.jsx'

export default function HomePage() {

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
      <Header />
      <main>
        <Courses>
          {
            !courses.length
            ?
            <>
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
            </>
            :
            courses.map(course => (
              <Course 
              key={course.id}
              id={course.id}
              img={course.media.url_cover} 
              title={course.title} 
              description={course.description} />
            ))
          }
        </Courses>
      </main>
      <Footer />
    </>
  )
}