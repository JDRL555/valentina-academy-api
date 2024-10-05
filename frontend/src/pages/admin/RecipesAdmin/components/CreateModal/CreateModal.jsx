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
  ingredients
}) {
  const [creating, setCreating] = useState(false)
  const [steps, setSteps] = useState(1)
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    ingredient: [],
    steps: []
  })
  const [courseStatus, setRecipeStatus] = useState({ status: null, error: "" })

  const onInputChange = e => {
    setNewRecipe({ ...newRecipe, [e.target.id]: e.target.value })
  }

  const onIngredientsChange = e => {
    if(e.target.checked) {
      newRecipe.ingredient.push(e.target.id)
    }
  }

  const onStepChange = e => {
    if(!newRecipe.steps[e.target.id]) {
      newRecipe.steps.push(e.target.value)
    } else {
      newRecipe.steps[e.target.id] = e.target.value
    }
  }

  const onCreateRecipe = async e => {
    setCreating(true)
    e.preventDefault()

    const recipeResponse = await fetchToApi(BACKEND_ROUTES.recipes, {
      method: "POST",
      body: JSON.stringify(newRecipe),
      headers: {
        'Content-type': "application/json"
      }
    })

    if(recipeResponse?.detail) {
      setRecipeStatus({ status: false, error: "Hubo un error, intenta nuevamente" })
      return
    }

    console.log(recipeResponse);

    setShowModal(false)
    setCreating(false)
    // window.location.href = "/recipes/admin"
    
  }

  const createForm = () =>     
    <>
      <form className='modal_form' onSubmit={onCreateRecipe}>
        <div className='input_container'>
          <label htmlFor="name">Nombre de la receta</label>
          <input required onChange={onInputChange} type="text" id='name' />
        </div>
        <div className='input_container'>
          <label htmlFor="description">Descripción de la receta</label>
          <textarea required onChange={onInputChange} id='description' />
        </div>
        <div>
          <label>Ingredientes de la receta</label>
          <div className='admin_checks_container'>
            {
              ingredients.map(ingredient => (
                <div key={ingredient.id} className='admin_checks'>
                  <input 
                    key={ingredient.id} 
                    type="checkbox" 
                    onChange={onIngredientsChange}
                    id={ingredient.id} 
                  />
                  <label htmlFor={ingredient.id}>{ingredient.name}</label>
                </div>
              ))
            }
          </div>
        </div>
        <div>
          <label htmlFor="steps">
            Pasos de la receta
            <i 
              className="fa-solid fa-plus"
              onClick={() => setSteps(steps + 1)}
            ></i>
            <i 
              className="fa-solid fa-minus"
              onClick={() => setSteps(steps !== 1 ? steps - 1 : steps)}
            ></i>
          </label>
          <div>
            {
              [...Array(steps)].map((_, index) => (
                <div key={index} className='admin_steps'>
                  <label htmlFor={index}>{index + 1}</label>
                  <textarea required onChange={onStepChange} id={index} />
                </div>
              ))
            }
          </div>
        </div>
        <button type='submit'>
          Crear receta
        </button>
      </form>
    </>

  const recipeResponse = () => 
    <div className='course_response'>
      {
        courseStatus.status === null
        ?
        (
          <>
            <img src={video} className='course_video_icon_skeleton' />
            <h1>Creando receta...</h1>
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
      <h1>Crea una nueva receta</h1>
      {
        !creating 
        ? createForm()
        : recipeResponse()
      }
    </Modal>
  )
}
