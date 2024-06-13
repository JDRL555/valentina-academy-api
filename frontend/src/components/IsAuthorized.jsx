/* eslint-disable react/prop-types */
import { useCookies } from 'react-cookie'
import { fetchToApi } from '../services/api'

export default function IsAuthorized({ children }) {
  // const [token] = useCookies(["access_token"])

  // fetchToApi(`users/auth/${token.access_token}`)
  // .then(data => {
  //   console.log(data);
  // })

  return (
    <>
      {children}
    </>
  )
}
