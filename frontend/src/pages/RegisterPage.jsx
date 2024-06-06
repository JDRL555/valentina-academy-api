import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { translateError } from '../utils/errorTranslate'

import { fetchToApi } from '../services/api'

import { COLORS } from '../constants/message'

import "../styles/Register.css"

export default function RegisterPage() {

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: ""
  })
  const [confirm, setConfirm] = useState("")
  const [message, setMessage] = useState({ value: "", color: COLORS.error })

  const navigate = useNavigate()

  const onChange = e => setUser({ ...user, [e.target.id]: e.target.value })
  const onChangeConfirm = e => setConfirm(e.target.value)

  const showMessage = () => {
    const message = document.querySelector(".message")
    message.style.visibility = "visible"
    message.style.opacity = 1
  }

  const hideMessage = () => {
    const message = document.querySelector(".message")
    message.style.visibility = "hidden"
    message.style.opacity = 0
  }

  const onSubmit = async e => {
    e.preventDefault()

    if(confirm != user.password) {
      setMessage({ 
        value: "Las claves deben coincidir",
        color: COLORS.error
      })
      showMessage()
    } else {
      setMessage({
        value: "Registrando...",
        color: COLORS.success
      })
      showMessage()
      const response = await fetchToApi("users/register", "POST", user)
      if(response?.user) {
        navigate("/login")
      } else {
        if(response?.username) {
          setMessage({ 
            value: translateError(response.username[0]),
            color: COLORS.error
          })
          showMessage()
        }
      }
    }

  }

  return (
    <div className="register">
        <form onSubmit={onSubmit}>
            <h2>Registro</h2>
            <section>
                <label htmlFor="first_name">Nombres</label>
                <input 
                  type="text" 
                  id='first_name' 
                  placeholder="Nombres" 
                  required
                  onChange={onChange}
                />
            </section>
            <section>
                <label htmlFor="last_name">Apellidos</label>
                <input 
                  type="text" 
                  id='last_name' 
                  placeholder="Apellidos" 
                  required
                  onChange={onChange}
                />
            </section>
            <section>
                <label htmlFor="username">Nombre de usuario</label>
                <input 
                  type="text" 
                  id='username' 
                  placeholder="Nombre de usuario" 
                  required
                  onChange={onChange}
                />
            </section>
            <section>
                <label htmlFor="email">Correo</label>
                <input 
                  type="email" 
                  id='email' 
                  placeholder="Correo" 
                  required
                  onChange={onChange}
                />
            </section>
            <section>
                <label htmlFor="password">Contraseña</label>
                <input 
                  type="password" 
                  id='password' 
                  placeholder="Contraseña" 
                  required
                  onChange={onChange}
                />
            </section>
            <section>
                <label htmlFor="confirm">Confirmar Contraseña</label>
                <input 
                  type="password" 
                  id='confirm' 
                  placeholder="Confirmar Contraseña" 
                  required
                  onChange={onChangeConfirm}
                />
            </section>
            <Link to={"/login"}>
                <p className='redirect'>Si tienes una cuenta, inicia sesión aquí</p>
            </Link>
            <button className="boton">Enviar</button>
            <p 
              onClick={hideMessage} 
              className='message' 
              style={{ backgroundColor: message.color }}
            >
              {message.value}
            </p>
        </form>
    </div>
  )
}