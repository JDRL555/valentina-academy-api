/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import PayCoursePage from './Payment/PayCoursePage'
import CoursePage from './Course/CoursePage'

import { ContextApp } from '@context/ContextApp'
import { BACKEND_ROUTES } from '@constants/routes'
import { fetchToApi } from '@api'

export default function Index({ setCompleted }) {
  const { id } = useParams()
  const { user } = useContext(ContextApp)
  const [ isPurchased, setIsPurchased ] = useState(null)
  const [ course, setCourse ] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    async function wasPurchased() {
      const response = await fetchToApi(
        BACKEND_ROUTES.purchased_courses, 
        {}, 
        { user_id: user.id, course_id: id }
      )

      if(response.error) {
        navigate("/dashboard")
      }

      if(response.length == 0) {
        const courseResponse = await fetchToApi(`${BACKEND_ROUTES.courses}/${id}`)
        setIsPurchased(false)
        setCourse(courseResponse)
        return
      }

      if(response[0]?.course) {
        setCourse(response[0].course)
      }

      if(!response[0]?.is_purchased) {
        setIsPurchased(false)
        return
      }

      setIsPurchased(true)
    }
    wasPurchased()
  }, [isPurchased])

  if(!isPurchased) {
    return <PayCoursePage course={course} />
  }
  return <CoursePage setCompleted={setCompleted} /> 
}
