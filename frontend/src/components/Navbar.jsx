import logo from "../public/img/logo.jpg"
import user from "../public/img/usuario.png"
import "../styles/Navbar.css"

export default function Navbar() {
  return (
    <nav>
      <ul className="ul_logo">
        <li><img src={logo} className="logo" /></li>
        <li><h1>Gastronomy App</h1></li>
      </ul>
      <ul className="ul_items">
        <li><a href="#">elemento 1</a></li>
        <li ><a href="#">elemento 2</a></li>
        <li><a href="#">Inicio de Sesion</a></li>
        <li><a href="#">Registro</a></li>
        <li><img src={user} className="user_logo" /></li>
      </ul>
    </nav>
  )
}