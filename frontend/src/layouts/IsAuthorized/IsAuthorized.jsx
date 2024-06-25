/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { BACKEND_ROUTES } from '@constants/routes'

import { ContextApp } from '@context/ContextApp'
import { fetchToApi } from '@api'

export default function IsAuthorized({ children }) {
  const [token] = useCookies(["access_token"])
  const navigate = useNavigate()
  const context = useContext(ContextApp)

  useEffect(() => {
    async function authUser() {
      if(!token) {
        navigate("/login")
        return
      }
      const response = await fetchToApi(`${BACKEND_ROUTES.auth}/${token.access_token}`)
      if(!response?.user) {
        navigate("/login")
        return
      } else {
        context.setUser(response.user)
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
