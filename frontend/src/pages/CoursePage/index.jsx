/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CoursePage from './CoursePage'

import { ContextApp } from '../../context/ContextApp'
import { BACKEND_ROUTES } from '../../constants/routes'
import { fetchToApi } from '../../services/api'

export default function Index({ setCompleted }) {
  const { id } = useParams()
  const { user } = useContext(ContextApp)
  const [ isPurchased, setIsPurchased ] = useState(false)

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

      if(!response[0].is_purchased) {
        setIsPurchased(false)
        return
      }

      setIsPurchased(true)
    }
    wasPurchased()
  })


  return isPurchased ? <CoursePage setCompleted={setCompleted} /> : <div>Compralo ya</div>
}
