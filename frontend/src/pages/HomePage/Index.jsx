import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { BACKEND_ROUTES } from '@constants/routes.js'
import { ContextApp } from '@context/ContextApp'
import { fetchToApi } from '@api'

import Loading from '@components/Loading/Loading'

import HomePage from './HomePage'

export default function Index() {
  const [selectingRole, setSelectingRole] = useState(true)
  const { user } = useContext(ContextApp)
  const navigate = useNavigate()

  useEffect(() => {
    async function redirectByRole() {
      const response = await fetchToApi(`${BACKEND_ROUTES.roles}/${user.id}`)
      
      if(response.role === "teacher") {
        navigate("/courses/admin")
        return
      } else if(response.role === "admin") {
        navigate("/admin")
        return
      } else {
        setSelectingRole(false)
      }
    }
    redirectByRole()
  })

  if(selectingRole) {
    return (
      <Loading />
    )
  }

  return (
    <HomePage />
  )
}