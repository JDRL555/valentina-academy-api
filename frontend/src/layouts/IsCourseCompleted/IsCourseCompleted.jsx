/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function IsCourseCompleted({ children, completed }) {

  const navigate = useNavigate()

  useEffect(() => {
    if(!completed) {
      navigate("/dashboard")
    }
  })

  return (
    <>
      {children}
    </>
  )

}
