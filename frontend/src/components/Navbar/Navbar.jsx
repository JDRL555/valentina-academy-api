/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useCookies } from 'react-cookie'

import { BACKEND_ROUTES } from '../../constants/routes'

import { fetchToApi } from '../../services/api'

import { ContextApp } from '@context/ContextApp'

import logo from "@public/img/logo.jpg"
import userImg from "@public/img/usuario.png"

import "./Navbar.css"

export default function Navbar() {
  const { user } = useContext(ContextApp)
  const [token, _, removeCookie ] = useCookies(["access_token"])
  const navigate = useNavigate()

  const signOut = async () => {
    await fetchToApi(BACKEND_ROUTES.logout)
    removeCookie("access_token")
    navigate("/")
  }

  return (
    <nav className='navbar'>
      <ul className="ul_logo">
        <li><img src={logo} className="logo" /></li>
        <li><h1>Academia Valentina</h1></li>
      </ul>
      <ul className="ul_items">
        {
          !token.access_token 
          ?
          <>
            <li>
              <Link to={"/login"}>Inicia Sesión</Link>
            </li>
            <li>
              <Link to={"/register"}>Registrate</Link>
            </li>
          </> 
          :
          <>
            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
          </>
        }
        {
          token.access_token && 
          <li>
            <label htmlFor="submenu_input">
              <img src={userImg} className="user_logo" />
            </label>
            <input type="checkbox" id='submenu_input' />
            <ul className='submenu'>
              <li>
                <Link to={""}>{ user.username }</Link>
              </li>
              <li>
                <p onClick={signOut} className='sign_out'>
                  Cerrar sesión
                </p>
              </li>
            </ul>
          </li>
        }
      </ul>
    </nav>
  )
}