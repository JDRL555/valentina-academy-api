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
    ingredients: [],
    steps: []
  })
  const [courseStatus, setRecipeStatus] = useState({ status: null, error: "" })

  useEffect(() => {
    async function getRecipeInfo() {
      if(showModal) {
        setRecipe({})
        const recipeResponse = await fetchToApi(`${BACKEND_ROUTES.recipes}/${recipeId}`)
        setRecipe(recipeResponse)
      } else {
        setUpdating(false)
      }
    } 
    getRecipeInfo()
  }, [showModal])

  const onInputChange = e => {
    setRecipe({ ...recipe, [e.target.id]: e.target.value })
  }

  const onIngredientsChange = (e) => {
    const updatedIngredients = [...recipe.ingredients];
    const ingredientId = e.target.id;

    if (e.target.checked) {
      if (!updatedIngredients.find((i) => i.id === ingredientId)) {
        updatedIngredients.push({ id: ingredientId })
      }
    } else {
      const ingredientIndex = updatedIngredients.findIndex((i) => i.id === ingredientId);
      if (ingredientIndex !== -1) {
        updatedIngredients.splice(ingredientIndex, 1)
      }
    }

    setRecipe({ ...recipe, ingredients: updatedIngredients })
  };


  const onStepChange = e => {
    const newSteps = recipe.steps
    newSteps[e.target.id] = e.target.value

    setRecipe({ ...recipe, steps: newSteps })
  }

  const onDeleteStep = () => {
    if(recipe.steps.length !== 1) {
      const newSteps = recipe.steps
      newSteps.pop()
      setRecipe({ ...recipe, steps: newSteps })
    }
  }

  const onAddStep = () => {
    const newSteps = recipe.steps
    newSteps.push("")
    setRecipe({ ...recipe, steps: newSteps })
  }

  const onEditRecipe = async e => {
    setUpdating(true)
    e.preventDefault()

    const newIngredients = recipe.ingredients.map(ingredient => ingredient.id)

    setRecipe({ ...recipe, ingredients: newIngredients })

    const recipeResponse = await fetchToApi(`${BACKEND_ROUTES.recipes}/${recipeId}`, {
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
          <label htmlFor="name">Nombre de la receta</label>
          <input 
            required 
            onChange={onInputChange}
            defaultValue={recipe.name} 
            type="text" 
            id='name' 
          />
        </div>
        <div className='input_container'>
          <label htmlFor="description">Descripción de la receta</label>
          <textarea 
            required 
            onChange={onInputChange}
            defaultValue={recipe.description} 
            id='description' 
          />
        </div>
        <div className='input_container'>
          <label>Ingredientes de la receta</label>
          <div className='admin_checks_container'>
            {
              ingredients.map(ingredient => (
                <div key={ingredient.id} className='admin_checks'>
                  <input 
                    key={ingredient.id} 
                    type="checkbox" 
                    id={ingredient.id} 
                    checked={recipe.ingredients?.some((i) => i.id === ingredient.id)}
                    onChange={onIngredientsChange}
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
              onClick={onAddStep}
            ></i>
            <i 
              className="fa-solid fa-minus"
              onClick={onDeleteStep}
            ></i>
          </label>
          <div>
            {
              recipe.steps?.map((step, index) => (
                <div key={index} className='admin_steps'>
                  <label htmlFor={index}>{index + 1}</label>
                  <textarea 
                    required 
                    onChange={onStepChange} 
                    defaultValue={step}
                    id={index} 
                  />
                </div>
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
    <div className='response'>
      {
        courseStatus.status === null
        ?
        (
          <>
            <img src={video} className='course_video_icon_skeleton' />
            <h1>Actualizando receta...</h1>
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
