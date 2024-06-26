/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from 'react'

import video from '@assets/video_loading.png'
import error from '@assets/error.png'

import { fetchToApi } from '@api'
import { BACKEND_ROUTES } from '@constants/routes'

import Modal from '@components/Modal/Modal'

export default function CreateModal({ 
  showModal,
  setShowModal, 
}) {
  const [creating, setCreating] = useState(false)

  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: ""
  })

  const [UserStatus, setUserStatus] = useState({ status: null, error: "" })

  const onInputChange = e => setNewUser({ ...newUser, [e.target.id]: e.target.value })
  

  const onCreateUser = async e => {
    setCreating(true)
    e.preventDefault()

    const UserResponse = await fetchToApi(BACKEND_ROUTES.users, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        'Content-type': "application/json"
      }
    })

    if(UserResponse?.detail) {
      setUserStatus({ status: false, error: "Hubo un error, intenta nuevamente" })
      return
    }

    setShowModal(false)
    setCreating(false)
    window.location.href = "/users/admin"
    
  }

  const createForm = () =>     
    <>
      <form className='modal_form' onSubmit={onCreateUser}>
        <div className='input_container'>
          <label htmlFor="first_name">Nombre</label>
          <input required onChange={onInputChange} type="text" id='first_name' />
        </div>
        <div className='input_container'>
          <label htmlFor="last_name">Apellido</label>
          <input required onChange={onInputChange} type='text' id='last_name' />
        </div>
        <div className='input_container'>
          <label htmlFor="username">Nombre de usuario</label>
          <input required onChange={onInputChange} type="text" id='username' />
        </div>
        <div className='input_container'>
          <label htmlFor="email">Correo</label>
          <input required onChange={onInputChange} type="email" id='email' />
        </div>
        <div className='input_container'>
          <label htmlFor="password">Contraseña</label>
          <input required onChange={onInputChange} type="password" id='password' />
        </div>
        <button type='submit'>
          Crear curso
        </button>
      </form>
    </>

  const UserResponse = () => 
    <div className='response_creation'>
      {
        UserStatus.status === null
        ?
        (
          <>
            <img src={video} className='course_video_icon_skeleton' />
            <h1>Creando usuario...</h1>
          </>
        )
        :
        (
          <>
            <img src={error} className='error_icon' />
            <h1 className='error_text'>ERROR: {UserStatus.error}</h1>
          </>
        )
      }
    </div>


  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <h1>Crea un nuevo Curso</h1>
      {
        !creating 
        ? createForm()
        : UserResponse()
      }
    </Modal>
  )
}
