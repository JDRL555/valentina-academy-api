import { useState, useEffect } from 'react'

import { BACKEND_ROUTES } from '@constants/routes'
import { fetchToApi } from '@api'

import AdminSkeleton from '../skeleton/AdminSkeleton'

import CreateModal from './components/CreateModal/CreateModal'
import EditModal from './components/EditModal/EditModal'
import DeleteModal from './components/DeleteModal/DeleteModal'

import Navbar from '@components/Navbar/Navbar'

export default function IngredientsAdmin() {
  const animationData = []
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [ingredientId, setIngredientId] = useState(0)
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    async function getIngredients() {
      const response = await fetchToApi(BACKEND_ROUTES.ingredients)
      setIngredients(response)
    }
    getIngredients()
  }, [])

  const onIngredientClicked = (index) => {
    const coursesCard = document.querySelectorAll(".admin_card")
    const courseCard = coursesCard[index]

    const ingredientsInfo = courseCard.querySelector(".admin_info_container")
    const arrow = courseCard.querySelector(".fa-caret-right")

    if(animationData[index].deg == 0 && animationData[index].animation == "fade-out .5s forwards") {
      animationData[index].deg = 90
      animationData[index].animation = "fade-in .5s forwards"
    } else {
      animationData[index].deg = 0
      animationData[index].animation = "fade-out .5s forwards"
    }
    arrow.style.transform = `rotate(${animationData[index].deg}deg)`
    ingredientsInfo.style.animation = animationData[index].animation
  }
  
  // if(ingredients?.length == 0) {
  //   return <AdminSkeleton />
  // }

  return (
    <>
      <Navbar />
      <main className='main_content'>
        <h1>
          Administración de ingredientes 
          <i 
            className="fa-solid fa-plus"
            onClick={() => setShowCreate(true)}
          ></i>
        </h1>
        {
          ingredients.map((ingredient, index) => {
            animationData.push({ deg: 0, animation: "fade-out .5s forwards" })
            return (
              <section key={index} className='admin_card' onClick={() => onIngredientClicked(index)}>
                <div className='admin_header'>
                  <h1>{ingredient.name}</h1>
                  <div>
                    <i 
                      className="fa-solid fa-pen-to-square"
                      onClick={() => {
                        setIngredientId(ingredient.id)
                        setShowEdit(true)
                      }}
                    ></i>
                    <i 
                      className="fa-solid fa-trash"
                      onClick={() => {
                        setIngredientId(ingredient.id)
                        setShowDelete(true)
                      }}  
                    ></i>
                    <i className="fa-solid fa-caret-right"></i>
                  </div>
                </div>
                <div className='admin_info_container'>
                  <div className='admin_info'>
                    <div className='admin_details'>
                      <h2>Detalles del ingrediente</h2>
                      <p><b>Nombre de ingrediente:</b> {ingredient.name}</p>
                    </div>
                  </div>
                </div>
              </section>
            )
          })
        }
      </main>
      <CreateModal 
        showModal={showCreate} 
        setShowModal={setShowCreate} 
      />
      <EditModal 
        showModal={showEdit} 
        setShowModal={setShowEdit} 
        ingredientId={ingredientId}
      />
      <DeleteModal 
        showModal={showDelete}
        setShowModal={setShowDelete}
        ingredientId={ingredientId}
      />
    </>
  )
}
