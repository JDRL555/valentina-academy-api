/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import PayCoursePage from './PayCoursePage'
import CoursePage from './CoursePage'

import { ContextApp } from '../../context/ContextApp'
import { BACKEND_ROUTES } from '../../constants/routes'
import { fetchToApi } from '../../services/api'

export default function Index({ setCompleted }) {
  const { id } = useParams()
  const { user } = useContext(ContextApp)
  const [ isPurchased, setIsPurchased ] = useState(null)
  const [ course, setCourse ] = useState(null)

  useEffect(() => {
    async function wasPurchased() {
      const response = await fetchToApi(
        BACKEND_ROUTES.purchased_courses, 
        {}, 
        { user_id: user.id, course_id: id }
      )

      if(response.length == 0) {
        setIsPurchased(false)
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
    if(!course) {
      return <div>cargando...</div>
    }
    return <PayCoursePage course={course} />
  }
  return <CoursePage setCompleted={setCompleted} /> 
}
