/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { BACKEND_ROUTES } from '@constants/routes'

import { ContextApp } from '@context/ContextApp'
import { fetchToApi } from '@api'

export default function HasPermissions({ children, role }) {
  const navigate = useNavigate()
  const { user } = useContext(ContextApp)

  useEffect(() => {
    async function authUser() {
      const response = await fetchToApi(`${BACKEND_ROUTES.roles}/${user.id}`)
      if(!response?.role) {
        navigate("/")
        return
      }

      if(typeof role == "object") {
        if(!role.includes(response.role)) {
          navigate("/")
          return
        }
      } else {
        if(response.role !== role) {
          navigate("/")
          return
        }
      }
    }
    authUser()
  }, [])

  return (
    <>
      {children}
    </>
  )
}
