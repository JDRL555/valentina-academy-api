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

  const [newIngredient, setNewIngredient] = useState({
    name: "",
    quantity: "",
    unit: ""
  })

  const [IngredientStatus, setIngredientStatus] = useState({ status: null, error: "" })

  const onInputChange = e => setNewIngredient({ ...newIngredient, [e.target.id]: e.target.value })
  

  const onCreateIngredient = async e => {
    setCreating(true)
    e.preventDefault()

    const IngredientResponse = await fetchToApi(BACKEND_ROUTES.ingredients, {
      method: "POST",
      body: JSON.stringify({ 
        ...newIngredient, 
        name: `${newIngredient.name} (${newIngredient.quantity} ${newIngredient.unit})` 
      }),
      headers: {
        'Content-type': "application/json"
      }
    })

    if(IngredientResponse?.detail) {
      setIngredientStatus({ status: false, error: "Hubo un error, intenta nuevamente" })
      return
    }

    setShowModal(false)
    setCreating(false)
    window.location.href = "/ingredients/admin"
    
  }

  const createForm = () =>     
    <>
      <form className='modal_form' onSubmit={onCreateIngredient}>
        <div className='input_container'>
          <label htmlFor="name">Nombre</label>
          <input required onChange={onInputChange} type="text" id='name' />
        </div>
        <div className='input_container'>
          <label htmlFor="quantity">Cantidad</label>
          <input required onChange={onInputChange} type="text" id='quantity' />
          <select required id="unit" onChange={onInputChange}>
            <option disabled value="" selected> -- Seleccione una unidad de medida -- </option>
            <option value="gr">Gramos</option>
            <option value="mg">Miligramos</option>
            <option value="l">Litros</option>
            <option value="ml">Mililitros</option>
            <option value="">Unidades</option>
            <option value="cucharadas">Cucharadas</option>
          </select>
        </div>
        <button type='submit'>
          Crear ingrediente
        </button>
      </form>
    </>

  const IngredientResponse = () => 
    <div className='response'>
      {
        IngredientStatus.status === null
        ?
        (
          <>
            <img src={video} className='course_video_icon_skeleton' />
            <h1>Creando ingrediente...</h1>
          </>
        )
        :
        (
          <>
            <img src={error} className='error_icon' />
            <h1 className='error_text'>ERROR: {IngredientStatus.error}</h1>
          </>
        )
      }
    </div>


  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <h1>Crea un nuevo Ingrediente</h1>
      {
        !creating 
        ? createForm()
        : IngredientResponse()
      }
    </Modal>
  )
}
