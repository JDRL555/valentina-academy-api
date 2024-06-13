import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchToApi } from '../services/api'

import { translateError } from '../utils/errorTranslate'

import { COLORS } from '../constants/message'
import { BACKEND_ROUTES } from '../constants/routes'

import { useCookies } from 'react-cookie'

import "../styles/Login.css"

export default function LoginPage() {
    
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const [message, setMessage] = useState({ value: "", color: COLORS.error })

    const [ ,setToken] = useCookies(["access_token"])
    const navigate = useNavigate()
    
    const onChange = e => setUser({ ...user, [e.target.id]: e.target.value  })

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
        setMessage({
            value: "Iniciando sesión...",
            color: COLORS.success
        })
        showMessage()
        const response = await fetchToApi(BACKEND_ROUTES.login, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': "application/json"
            }
        })

        if(response?.error) {
            const message = document.querySelector(".message")
            message.style.visibility = "visible"
            message.style.opacity = 1
            setMessage({ 
                value: translateError(response.error),
                color: COLORS.error
            })
            showMessage()
        } else {
            if(response?.token) {
                const expires = new Date()
                expires.setTime(expires.getTime() + (60 * 60 * 60 * 100))
                setToken("access_token", response.token, {
                    path: "/",
                    expires
                })
                navigate("/dashboard")
            } else {
                setMessage({ 
                    value: "Hubo un error, intente mas tarde",
                    color: COLORS.error
                })
                showMessage()
            }
        }

    }

    return (
      <>
        <div className="login">
            <form onSubmit={onSubmit}>
                <h2>Inicio de Sesión:</h2>
                <section>
                    <label htmlFor="username">Nombre de usuario</label>
                    <input 
                        type="text" 
                        id='username' 
                        placeholder="Nombre de usuario"
                        onChange={onChange}
                        required 
                    />
                </section>
                <section>
                    <label htmlFor="password">Contraseña</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Contraseña"
                        onChange={onChange}
                        required 
                    />
                </section>
                <Link to={"/register"}>
                    <p className='redirect'>Si no tienes una cuenta, registrate aquí</p>
                </Link>
                <button type="submit">Enviar</button>
                <p 
                    onClick={hideMessage} 
                    className='message' 
                    style={{ backgroundColor: message.color }}
                >
                    {message.value}
                </p>
            </form>
        </div>
      </>
    )
}