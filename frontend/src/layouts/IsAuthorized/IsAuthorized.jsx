/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { BACKEND_ROUTES } from '@constants/routes'

import Loading from '@components/Loading/Loading'

import { ContextApp } from '@context/ContextApp'
import { fetchToApi } from '@api'

export default function IsAuthorized({ children }) {
  const [loading, setLoading] = useState(true)
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
      setLoading(false)
    }
    authUser()
  }, [])


  if(loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      {children}
    </>
  )
}
