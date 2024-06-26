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
  ingredients,
  recipeId
}) {
  const [updating, setUpdating] = useState(false)
  const [steps, setSteps] = useState(1)
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredient: [],
    steps: []
  })
  const [courseStatus, setRecipeStatus] = useState({ status: null, error: "" })

  useEffect(() => {
    async function getRecipeInfo() {
      setRecipe({})
      const recipeResponse = await fetchToApi(`${BACKEND_ROUTES.recipes}/${recipeId}`)
      setRecipe(recipeResponse)
    }
    getRecipeInfo()
  }, [])

  const onInputChange = e => {
    setRecipe({ ...recipe, [e.target.id]: e.target.value })
  }

  const onStepChange = e => {
    setRecipe({ 
      ...recipe, 
      steps: recipe.steps.map(
        (step, index) => 
          index === parseInt(e.target.value) - 1 ? e.target.value : step
      ) 
    })
  }

  const onEditRecipe = async e => {
    setUpdating(true)
    e.preventDefault()

    const recipeResponse = await fetchToApi(BACKEND_ROUTES.recipes, {
      method: "PATCH",
      body: JSON.stringify(recipe),
      headers: {
        'Content-type': "application/json"
      }
    })

    if(recipeResponse?.detail) {
      setRecipeStatus({ status: false, error: "Hubo un error, intenta nuevamente" })
      return
    }

    setShowModal(false)
    setUpdating(false)
    window.location.href = "/recipes/admin"
    
  }

  const loadingRecipe = () => 
    <div className='course_response'>
      <img src={video} className='course_video_icon_skeleton' />
      <h1>Cargando curso...</h1>
    </div>

  const editForm = () =>     
    <>
      <form className='modal_form' onSubmit={onEditRecipe}>
        <div className='input_container'>
          <label htmlFor="title">Nombre de la receta</label>
          <input 
            required 
            onChange={onInputChange}
            value={recipe.name} 
            type="text" 
            id='title' 
          />
        </div>
        <div className='input_container'>
          <label htmlFor="description">Descripción de la receta</label>
          <textarea 
            required 
            onChange={onInputChange}
            value={recipe.description} 
            id='description' 
          />
        </div>
        <div className='input_container'>
          <label>Ingredientes de la receta</label>
          <div className='admin_checks_container'>
            {
              ingredients.map(ingredient => (
                <div key={ingredient.id} className='admin_checks'>
                  <label htmlFor={ingredient.name}>{ingredient.name}</label>
                  <input 
                    key={ingredient.id} 
                    type="checkbox" 
                    id={ingredient.name} 
                    checked={
                      recipe.ingredient?.map(ingredientRecipe => ingredientRecipe.name).includes(ingredient.name)
                    }
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className='input_container'>
          <label htmlFor="steps">
            Pasos de la receta
            <i 
              className="fa-solid fa-plus"
              onClick={() => setSteps(steps + 1)}
            ></i>
          </label>
          <div>
            {
              [recipe.steps].map(step => (
                <>
                  <label htmlFor={step}>{step}</label>
                  <input 
                    required 
                    onChange={onStepChange}
                    value={step} 
                    type="text" 
                    id={step} 
                  />
                </>
              ))
            }
          </div>
        </div>
        <button type='submit'>
          Editar receta
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

const showContent = () => {
  if(!updating) {
    if(!recipe) {
      return loadingRecipe()
    }
    return editForm()
  } 
  return recipeResponse()
}


  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <h1>Actualiza una receta</h1>
      { showContent() }
    </Modal>
  )
}
