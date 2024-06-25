/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from 'react'

import video from '@assets/video_loading.png'
import error from '@assets/error.png'

import { fetchToApi } from '@api'
import { BACKEND_ROUTES } from '@constants/routes'

import Modal from '@components/Modal/Modal'

import "./CreateModal.css"

export default function CreateModal({ 
  showModal,
  setShowModal, 
  categories,
  users,
  recipes, 
}) {
  const [creating, setCreating] = useState(false)

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    category: 0,
    user: 0,
    media: 0,
    recipe: ""
  })
  const [newCourseMedia, setNewCourseMedia] = useState({
    cover: null,
    video: null
  })
  const [courseStatus, setCourseStatus] = useState({ status: null, error: "" })

  const onInputChange = e => {
    if(e.target.type === "file") {
      setNewCourseMedia({ ...newCourseMedia, [e.target.id]: e.target.files[0] })
    } else {
      setNewCourse({ ...newCourse, [e.target.id]: e.target.value })
    }
  }

  const onCreateCourse = async e => {
    setCreating(true)
    e.preventDefault()
    const formData = new FormData()
    formData.append("cover", newCourseMedia.cover)
    formData.append("video", newCourseMedia.video)

    const mediaResponse = await fetchToApi(BACKEND_ROUTES.courses_create_media, {
      method: "POST",
      body: formData
    })

    if(mediaResponse?.error) {
      setCourseStatus({ status: false, error })
      return
    }

    setNewCourse({ ...newCourse, media: mediaResponse.id })

    const courseResponse = await fetchToApi(BACKEND_ROUTES.courses, {
      method: "POST",
      body: JSON.stringify({ ...newCourse, media: mediaResponse.id }),
      headers: {
        'Content-type': "application/json"
      }
    })

    if(courseResponse?.detail) {
      setCourseStatus({ status: false, error: "Hubo un error, intenta nuevamente" })
      return
    }

    setShowModal(false)
    setCreating(false)
    window.location.href = "/teacher"
    
  }

  const createForm = () =>     
    <>
      <form className='modal_form' onSubmit={onCreateCourse}>
        <div className='input_container'>
          <label htmlFor="title">Titulo del curso</label>
          <input required onChange={onInputChange} type="text" id='title' />
        </div>
        <div className='input_container'>
          <label htmlFor="description">Descripción del curso</label>
          <textarea required onChange={onInputChange} id='description' />
        </div>
        <div className='input_container'>
          <label htmlFor="duration">Duración del curso</label>
          <input required onChange={onInputChange} type="time" step={1} id='duration' />
        </div>
        <div className='input_container'>
          <label htmlFor="price">Precio del curso (dólares)</label>
          <input required onChange={onInputChange} type="number" id='price' />
        </div>
        <div className='input_container'>
          <label htmlFor="category">Categoría del curso</label>
          <select id='category' required onChange={onInputChange}>
            <option disabled value="" selected> -- Selecciona una categoría -- </option>
            {
              categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            }
          </select>
        </div>
        <div className='input_container'>
          <label htmlFor="user">Autor del curso</label>
          <select id='user' required onChange={onInputChange}>
            <option disabled value="" selected> -- Selecciona un usuario -- </option>
            {
              users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name}
                </option>
              ))
            }
          </select>
        </div>
        <div className='input_container'>
          <label htmlFor="cover">Carátula del curso</label>
          <input required onChange={onInputChange} type="file" accept='image/*' id='cover' />
        </div>
        <div className='input_container'>
          <label htmlFor="video">Vídeo del curso</label>
          <input required onChange={onInputChange} type="file" accept='video/*' id='video' />
        </div>
        <div className='input_container'>
          <label htmlFor="recipe">Receta del curso</label>
          <select id='recipe' required onChange={onInputChange}>
            <option disabled value="" selected> -- Selecciona una receta -- </option>
            {
              recipes.map(recipe => (
                <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
              ))
            }
          </select>
        </div>
        <button type='submit'>
          Crear curso
        </button>
      </form>
    </>

  const courseResponse = () => 
    <div className='course_response'>
      {
        courseStatus.status === null
        ?
        (
          <>
            <img src={video} className='course_video_icon_skeleton' />
            <h1>Creando curso...</h1>
          </>
        )
        :
        (
          <>
            <img src={error} className='error_icon' />
            <h1 className='error_text'>ERROR: {courseStatus.error}</h1>
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
        : courseResponse()
      }
    </Modal>
  )
}
