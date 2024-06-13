import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import logo from "../public/img/logo.jpg"
import user from "../public/img/usuario.png"
import "../styles/Navbar.css"

export default function Navbar() {
  const [token] = useCookies(["access_token"])

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
              <Link to={"login"}>Inicia Sesión</Link>
            </li>
            <li>
              <Link to={"register"}>Registrate</Link>
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
          token.access_token && <li><img src={user} className="user_logo" /></li>
        }
      </ul>
    </nav>
  )
}