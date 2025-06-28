/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

import { fetchToApi } from '@api'
import { BACKEND_ROUTES } from '@constants/routes'

import Navbar from '@components/Navbar/Navbar'

import AdminSkeleton from '../skeleton/AdminSkeleton'

import CreateModal from './components/CreateModal/CreateModal'
import EditModal from './components/EditModal/EditModal'
import DeleteModal from './components/DeleteModal/DeleteModal'

export default function RecipesAdmin() {
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [recipeId, setRecipeId] = useState(0)

  const [recipes, setRecipes] = useState([])
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    async function getCourseInfo() {
      const recipesResponse = await fetchToApi(BACKEND_ROUTES.recipes)
      const ingredientsResponse = await fetchToApi(BACKEND_ROUTES.ingredients)
      setRecipes(recipesResponse)
      setIngredients(ingredientsResponse)
    }
    getCourseInfo()
  }, [])
  const animationData = []

  const onRecipeClicked = (index) => {
    const recipesCard = document.querySelectorAll(".admin_card")
    const recipeCard = recipesCard[index]

    const teacherInfo = recipeCard.querySelector(".admin_info_container")
    const arrow = recipeCard.querySelector(".fa-caret-right")

    if(animationData[index].deg == 0 && animationData[index].animation == "fade-out .5s forwards") {
      animationData[index].deg = 90
      animationData[index].animation = "fade-in .5s forwards"
    } else {
      animationData[index].deg = 0
      animationData[index].animation = "fade-out .5s forwards"
    }
    arrow.style.transform = `rotate(${animationData[index].deg}deg)`
    teacherInfo.style.animation = animationData[index].animation
  }

  // if(recipes?.length == 0) {
  //   return <AdminSkeleton />
  // }

  return (
    <>
      <Navbar />
      <main className='main_content'>
        <h1>
          Administración de recetas 
          <i 
            className="fa-solid fa-plus"
            onClick={() => setShowCreate(true)}
          ></i>
        </h1>
        {
          recipes.map((recipe, index) => {
            animationData.push({ deg: 0, animation: "fade-out .5s forwards" })
            return (
              <section key={index} className='admin_card' onClick={() => onRecipeClicked(index)}>
                <div className='admin_header'>
                  <h1>{recipe.name}</h1>
                  <div>
                    <i 
                      className="fa-solid fa-pen-to-square"
                      onClick={() => {
                        setRecipeId(recipe.id)
                        setShowEdit(true)
                      }}
                    ></i>
                    <i 
                      className="fa-solid fa-trash"
                      onClick={() => {
                        setRecipeId(recipe.id)
                        setShowDelete(true)
                      }}  
                    ></i>
                    <i className="fa-solid fa-caret-right"></i>
                  </div>
                </div>
                <div className='admin_info_container'>
                  <div className='admin_info'>
                    <div className='admin_details'>
                      <h2>Detalles de la receta</h2>
                      <p><b>Descripción:</b> {recipe.description}</p>
                    </div>
                    <div className='admin_recipe'>
                      <div className='admin_recipe_details'>
                        <div>
                          <h3>Ingredientes</h3>
                          <ul>
                            {
                              recipe.ingredient?.map(ingredient => (
                                <li key={ingredient.id}>{ingredient.name}</li>
                              ))
                            }
                          </ul>
                        </div>
                        <div>
                        <h3>Pasos</h3>
                          <ul>
                            {
                              recipe.steps?.map(step => (
                                <li key={step}>{step}</li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
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
        ingredients={ingredients} 
      />
      <EditModal 
        showModal={showEdit} 
        setShowModal={setShowEdit}
        ingredients={ingredients} 
        recipeId={recipeId}
      />
      <DeleteModal 
        showModal={showDelete}
        setShowModal={setShowDelete}
        recipeId={recipeId}
      />
    </>
  )
}
