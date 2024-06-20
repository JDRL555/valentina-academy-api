/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

import video from '../../../../assets/video_loading.png'
import error from '../../../../assets/error.png'

import { fetchToApi } from '../../../../services/api'
import { BACKEND_ROUTES } from '../../../../constants/routes'

import Modal from '../Modal/Modal'

import "./CreateModal.css"

export default function CreateModal({ showModal, setShowModal }) {
  const [step, setStep] = useState(1)

  const [categories, setCategories] = useState([])
  const [users, setUsers] = useState([])
  const [recipes, setRecipes] = useState([])
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

  useEffect(() => {
    async function getCourseInfo() {
      const categoriesResponse = await fetchToApi(BACKEND_ROUTES.categories)
      const usersResponse = await fetchToApi(BACKEND_ROUTES.users)
      const recipesResponse = await fetchToApi(BACKEND_ROUTES.recipes)
      setCategories(categoriesResponse)
      setUsers(usersResponse)
      setRecipes(recipesResponse)
    }
    getCourseInfo()
  }, [])

  const onCreateCourse = async e => {
    setStep(0)
    e.preventDefault()
    const formData = new FormData()
    formData.append("cover", newCourseMedia.cover)
    formData.append("video", newCourseMedia.video)

    const mediaResponse = await fetchToApi(BACKEND_ROUTES.courses_create_media, {
      method: "POST",
      body: formData
    })

    const courseResponse = await fetchToApi(BACKEND_ROUTES.courses, {
      method: "POST",
      body: JSON.stringify(newCourse)
    })

    if(courseResponse?.detail) {
      setCourseStatus({ status: false, error: "Hubo un error, intenta nuevamente" })
    }

    
  }

  const onSubmitStep = e => {
    e.preventDefault()
    setStep(e.target.id)
  }

  const onInputChange = e => {
    if(e.target.type === "file") {
      setNewCourseMedia({ ...newCourseMedia, [e.target.id]: e.target.files[0] })
    } else {
      setNewCourse({ ...newCourse, [e.target.id]: e.target.value })
    }
  }

  const stepOne = () =>     
    <>
      <p><b>Paso 1: Información general del curso</b></p>
      <form className='modal_form' onSubmit={onSubmitStep} id="2">
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
          <input required onChange={onInputChange} type="time" id='duration' />
        </div>
        <div className='input_container'>
          <label htmlFor="price">Precio del curso</label>
          <input required onChange={onInputChange} type="number" id='price' />
        </div>
        <button type="submit">
          Siguiente paso
        </button>
      </form>
    </>

  const stepTwo = () =>     
    <>
      <p><b>Paso 2: categoría y autor del curso</b></p>
      <form className='modal_form' onSubmit={onSubmitStep} id="3">
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
        <button onClick={() => setStep(1)}>
          Paso anterior
        </button>
        <button type='submit'>
          Siguiente paso
        </button>
      </form>
    </>

  const stepThree = () =>     
    <>
      <p><b>Paso 3: Contenido multimedia del curso</b></p>
      <form className='modal_form' onSubmit={onSubmitStep} id="4">
        <div className='input_container'>
          <label htmlFor="cover">Carátula del curso</label>
          <input required onChange={onInputChange} type="file" accept='image/*' id='cover' />
        </div>
        <div className='input_container'>
          <label htmlFor="video">Vídeo del curso</label>
          <input required onChange={onInputChange} type="file" accept='video/*' id='video' />
        </div>
        <button onClick={() => setStep(2)}>
          Paso anterior
        </button>
        <button type="submit">
          Siguiente paso
        </button>
      </form>
    </>

  const stepFour = () =>     
    <>
      <p><b>Paso 4: receta del curso</b></p>
      <form className='modal_form' onSubmit={onCreateCourse} id="5">
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
        <button onClick={() => setStep(3)}>
          Paso anterior
        </button>
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
        step == 1 
        ? stepOne()
        : step == 2
        ? stepTwo()
        : step == 3
        ? stepThree()
        : step == 4 
        ? stepFour()
        : courseResponse()
      }
    </Modal>
  )
}
