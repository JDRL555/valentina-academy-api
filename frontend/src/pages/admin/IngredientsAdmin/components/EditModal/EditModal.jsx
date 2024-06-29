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
  ingredientId 
}) {
  const [updating, setUpdating] = useState(false)

  const [ingredient, setIngredient] = useState({})

  const [ingredientStatus, setIngredientStatus] = useState({ status: null, error: "" })

  useEffect(() => {
    async function getIngredientInfo() {
      setUpdating(false)
      setIngredient({})
      const ingredientResponse = await fetchToApi(`${BACKEND_ROUTES.ingredients}/${ingredientId}`)
      const ingredientList = ingredientResponse.name.split("(")
      const name = ingredientList[0]
      let quantity = ingredientList[1].split(" ")[0]
      let unit = null

      if(quantity[quantity.length - 1] == ")") {
        quantity = quantity.slice(0, -1)
      }

      if(ingredientList[1].split(" ")[1]?.slice) {
        unit = ingredientList[1].split(" ")[1].slice(0, -1)
      }
      setIngredient({
        name, quantity, unit
      })
    }
    getIngredientInfo()
  }, [showModal])

  const onInputChange = e => {
    setIngredient((prevIngredient) => {
      const newIngredient = {
        ...prevIngredient,
        [e.target.id]: e.target.value,
      }
      return newIngredient
    })
  }

  const onEditIngredient = async e => {
    setUpdating(true)
    e.preventDefault()

    const ingredientResponse = await fetchToApi(
      `${BACKEND_ROUTES.ingredients}/${ingredientId}`, 
    {
      method: "PATCH",
      body: JSON.stringify({ 
        ...ingredient, 
        name: `${ingredient.name} (${ingredient.quantity} ${ingredient.unit})` 
      }),
      headers: {
        'Content-type': "application/json"
      }
    })

    if(ingredientResponse?.detail) {
      setIngredientStatus({ status: false, error: "Hubo un error, intenta nuevamente" })
      return
    }

    setShowModal(false)
    setUpdating(false)
    window.location.href = "/ingredients/admin"
    
  }

  const loadingIngredient = () => 
    <div className='ingredient_response'>
      <img src={video} className='course_video_icon_skeleton' />
      <h1>Cargando ingrediente...</h1>
    </div>

  const editForm = () =>     
    <>
      <form className='modal_form' onSubmit={onEditIngredient}>
        <div className='input_container'>
          <label htmlFor="name">Nombre</label>
          <input 
            required 
            onChange={onInputChange}
            value={ingredient.name} 
            type="text" 
            id='name' 
          />
        </div>
        <div className='input_container'>
          <label htmlFor="quantity">Cantidad</label>
          <input 
            required 
            onChange={onInputChange}
            value={ingredient.quantity} 
            type="text" 
            id='quantity' 
          />
          <select 
            required 
            id="unit" 
            onChange={onInputChange}
            value={ingredient.unit}
          >
            <option disabled value="" selected> -- Seleccione una unidad de medida -- </option>
            <option selected={ingredient.unit == "gr"} value="gr">Gramos</option>
            <option selected={ingredient.unit == "mg"} value="mg">Miligramos</option>
            <option selected={ingredient.unit == "l"} value="l">Litros</option>
            <option selected={ingredient.unit == "ml"} value="ml">Mililitros</option>
            <option selected={ingredient.unit == null} value="">Unidades</option>
            <option selected={ingredient.unit == "cucharadas"} value="cucharadas">Cucharadas</option>
          </select>
        </div>
        <button type='submit'>
          Editar ingrediente
        </button>
      </form>
    </>

  const ingredientResponse = () => 
    <div className='response'>
      {
        ingredientStatus.status === null
        ?
        (
          <>
            <img src={video} className='course_video_icon_skeleton' />
            <h1>Editando ingrediente...</h1>
          </>
        )
        :
        (
          <>
            <img src={error} className='error_icon' />
            <h1 className='error_text'>ERROR: {ingredientStatus.error}</h1>
          </>
        )
      }
    </div>

    const showContent = () => {
      if(!updating) {
        if(!ingredient) {
          return loadingIngredient()
        }
        return editForm()
      } 
      return ingredientResponse()
    }


  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <h1>Actualiza un ingrediente</h1>
      { showContent() }
    </Modal>
  )
}
