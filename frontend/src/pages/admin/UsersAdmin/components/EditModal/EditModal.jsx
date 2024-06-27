/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

import video from '@assets/video_loading.png'
import error from '@assets/error.png'

import { fetchToApi } from '@api'
import { BACKEND_ROUTES } from '@constants/routes'

import Modal from '@components/Modal/Modal'

export default function EditModal({ 
  showModal, 
  setShowModal,   
  userId 
}) {
  const [updating, setUpdating] = useState(false)

  const [user, setUser] = useState({})

  const [userStatus, setUserStatus] = useState({ status: null, error: "" })

  useEffect(() => {
    async function getUserInfo() {
      setUser({})
      const userResponse = await fetchToApi(`${BACKEND_ROUTES.users}/${userId}`)
      setUser(userResponse)
    }
    getUserInfo()
  }, [showModal])

  const onInputChange = e => {
    setUser((prevUser) => {
      const newUser = {
        ...prevUser,
        [e.target.id]: e.target.value,
      }
      return newUser
    })
  }

  const onEditUser = async e => {
    setUpdating(true)
    e.preventDefault()

    const userResponse = await fetchToApi(
      `${BACKEND_ROUTES.users}/${userId}`, 
    {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        'Content-type': "application/json"
      }
    })

    if(userResponse?.detail) {
      setUserStatus({ status: false, error: "Hubo un error, intenta nuevamente" })
      return
    }

    setShowModal(false)
    setUpdating(false)
    window.location.href = "/users/admin"
    
  }

  const loadingUser = () => 
    <div className='user_response'>
      <img src={video} className='course_video_icon_skeleton' />
      <h1>Cargando usuario...</h1>
    </div>

  const editForm = () =>     
    <>
      <form className='modal_form' onSubmit={onEditUser}>
        <div className='input_container'>
          <label htmlFor="first_name">Nombre</label>
          <input 
            required 
            value={user.first_name} 
            onChange={onInputChange} 
            type="text" 
            id='first_name' 
          />
        </div>
        <div className='input_container'>
          <label htmlFor="last_name">Apellido</label>
          <input 
            required 
            value={user.last_name} 
            onChange={onInputChange} 
            type="text" 
            id='last_name' 
          />
        </div>
        <div className='input_container'>
          <label htmlFor="username">Nombre de usuario</label>
          <input 
            required 
            value={user.username} 
            onChange={onInputChange} 
            type="text" 
            id='username' 
          />
        </div>
        <div className='input_container'>
          <label htmlFor="email">Correo</label>
          <input 
            required 
            value={user.email} 
            onChange={onInputChange} 
            type="email" 
            id='email' 
          />
        </div>
        <div className='input_container'>
          <label htmlFor="password">Contraseña</label>
          <input 
            required 
            value={user.password} 
            onChange={onInputChange} 
            type="password" id='password' 
          />
        </div>
        <button type='submit'>
          Editar usuario
        </button>
      </form>
    </>

  const userResponse = () => 
    <div className='response'>
      {
        userStatus.status === null
        ?
        (
          <>
            <img src={video} className='course_video_icon_skeleton' />
            <h1>Editando usuario...</h1>
          </>
        )
        :
        (
          <>
            <img src={error} className='error_icon' />
            <h1 className='error_text'>ERROR: {userStatus.error}</h1>
          </>
        )
      }
    </div>

    const showContent = () => {
      if(!updating) {
        if(!user) {
          return loadingUser()
        }
        return editForm()
      } 
      return userResponse()
    }


  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <h1>Actualiza un usuario</h1>
      { showContent() }
    </Modal>
  )
}
