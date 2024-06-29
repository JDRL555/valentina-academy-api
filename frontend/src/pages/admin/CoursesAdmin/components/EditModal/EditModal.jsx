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
  categories,
  users,
  recipes, 
  courseId 
}) {
  const [updating, setUpdating] = useState(false)

  const [course, setCourse] = useState({})
  const [courseMedia, setCourseMedia] = useState({})

  const [courseStatus, setCourseStatus] = useState({ status: null, error: "" })

  useEffect(() => {
    async function getCourseInfo() {
      setCourse({})
      const courseResponse = await fetchToApi(`${BACKEND_ROUTES.courses}/${courseId}`)
      setCourse({
        ...courseResponse,
        user: courseResponse.user.id,
        category: courseResponse.category.id,
        recipe: courseResponse.recipe.id,
        media: courseResponse.media.id
      })
    }
    getCourseInfo()
  }, [showModal])

  const onInputChange = e => {
    if(e.target.type === "file") {
      setCourseMedia({ ...courseMedia, [e.target.id]: e.target.files[0] })
    } else {
      setCourse((prevCourse) => {
        const newCourse = {
          ...prevCourse,
          [e.target.id]: e.target.value,
        }
        return newCourse
      })
    }
  }

  const onEditCourse = async e => {
    setUpdating(true)
    e.preventDefault()
    const formData = new FormData()
    formData.append("cover", courseMedia.cover)
    formData.append("video", courseMedia.video)

    const mediaResponse = await fetchToApi(
      `${BACKEND_ROUTES.courses_media}/${course.media}`, 
    {
      method: "PATCH",
      body: formData
    })

    if(mediaResponse?.error) {
      setCourseStatus({ status: false, error })
      return
    }

    const courseResponse = await fetchToApi(
      `${BACKEND_ROUTES.courses}/${courseId}`, 
    {
      method: "PATCH",
      body: JSON.stringify({ 
        ...course, 
        user: course.user?.id || course.user,  
        category: course.category?.id || course.category,
        recipe: course.recipe?.id || course.recipe,
        media: mediaResponse.id
      }),
      headers: {
        'Content-type': "application/json"
      }
    })

    if(courseResponse?.detail) {
      setCourseStatus({ status: false, error: "Hubo un error, intenta nuevamente" })
      return
    }

    setShowModal(false)
    setUpdating(false)
    window.location.href = "/courses/admin"
    
  }

  const loadingCourse = () => 
    <div className='course_response'>
      <img src={video} className='course_video_icon_skeleton' />
      <h1>Cargando curso...</h1>
    </div>

  const editForm = () =>     
    <>
      <form className='modal_form' onSubmit={onEditCourse}>
        <div className='input_container'>
          <label htmlFor="title">Titulo del curso</label>
          <input 
            required 
            onChange={onInputChange} 
            value={course.title}
            type="text" 
            id='title' 
          />
        </div>
        <div className='input_container'>
          <label htmlFor="description">Descripción del curso</label>
          <textarea 
            required 
            onChange={onInputChange} 
            value={course.description}
            id='description' 
          />
        </div>
        <div className='input_container'>
          <label htmlFor="duration">Duración del curso</label>
          <input 
            required 
            onChange={onInputChange}
            value={course.duration}
            type="time" 
            step={1} 
            id='duration' 
          />
        </div>
        <div className='input_container'>
          <label htmlFor="price">Precio del curso (dólares)</label>
          <input 
            required 
            onChange={onInputChange} 
            value={course.price}
            type="number" 
            id='price' 
          />
        </div>
        <div className='input_container'>
          <label htmlFor="category">Categoría del curso</label>
          <select id='category' 
            required 
            onChange={onInputChange}>
            <option disabled value="" selected> -- Selecciona una categoría -- </option>
            {
              categories.map(category => (
                <option 
                  key={category.id} 
                  value={category.id}
                  selected={course.category === category.id}
                >
                  {category.name}
                </option>
              ))
            }
          </select>
        </div>
        <div className='input_container'>
          <label htmlFor="user">Autor del curso</label>
          <select id='user' 
            required 
            onChange={onInputChange}>
            <option disabled value="" selected> -- Selecciona un usuario -- </option>
            {
              users.map(user => (
                <option 
                  key={user.id} 
                  value={user.id}
                  selected={course.user === user.id}
                >
                  {user.first_name} {user.last_name}
                </option>
              ))
            }
          </select>
        </div>
        <div className='input_container'>
          <label htmlFor="cover">Carátula del curso</label>
          <input 
            required 
            onChange={onInputChange} 
            type="file" 
            accept='image/*' 
            id='cover' 
          />
        </div>
        <div className='input_container'>
          <label htmlFor="video">Vídeo del curso</label>
          <input 
            required 
            onChange={onInputChange} 
            type="file" 
            accept='video/*' 
            id='video' 
          />
        </div>
        <div className='input_container'>
          <label htmlFor="recipe">Receta del curso</label>
          <select id='recipe' 
            required 
            onChange={onInputChange}>
            <option disabled value="" selected> -- Selecciona una receta -- </option>
            {
              recipes.map(recipe => (
                <option 
                  key={recipe.id} 
                  value={recipe.id}
                  selected={course.recipe === recipe.id}
                >
                  {recipe.name}
                </option>
              ))
            }
          </select>
        </div>
        <button type='submit'>
          Editar curso
        </button>
      </form>
    </>

  const courseResponse = () => 
    <div className='response'>
      {
        courseStatus.status === null
        ?
        (
          <>
            <img src={video} className='course_video_icon_skeleton' />
            <h1>Editando curso...</h1>
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

    const showContent = () => {
      if(!updating) {
        if(!course) {
          return loadingCourse()
        }
        return editForm()
      } 
      return courseResponse()
    }


  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <h1>Actualiza un curso</h1>
      { showContent() }
    </Modal>
  )
}
