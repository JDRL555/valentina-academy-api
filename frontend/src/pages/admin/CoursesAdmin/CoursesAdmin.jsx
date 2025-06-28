/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

import { fetchToApi } from '@api'
import { BACKEND_ROUTES } from '@constants/routes'
import Navbar from '@components/Navbar/Navbar'

import AdminSkeleton from '../skeleton/AdminSkeleton'

import CreateModal from './components/CreateModal/CreateModal'
import EditModal from './components/EditModal/EditModal'
import DeleteModal from './components/DeleteModal/DeleteModal'

export default function CoursesAdmin() {
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [courseId, setCourseId] = useState(0)

  const [categories, setCategories] = useState([])
  const [users, setUsers] = useState([])
  const [recipes, setRecipes] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    async function getCourseInfo() {
      const coursesResponse = await fetchToApi(BACKEND_ROUTES.courses)

      const categoriesResponse = await fetchToApi(BACKEND_ROUTES.categories)
      const usersResponse = await fetchToApi(BACKEND_ROUTES.users)
      const recipesResponse = await fetchToApi(BACKEND_ROUTES.recipes)
      
      setCourses(coursesResponse)
      
      setCategories(categoriesResponse)
      setUsers(usersResponse)
      setRecipes(recipesResponse)
      setLoading(false)
    }
    getCourseInfo()
  }, [])
  const animationData = []

  const onCourseClicked = (index) => {
    const coursesCard = document.querySelectorAll(".admin_card")
    const courseCard = coursesCard[index]

    const teacherInfo = courseCard.querySelector(".admin_info_container")
    const arrow = courseCard.querySelector(".fa-caret-right")

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

  // if(loading == false) {
  //   return <AdminSkeleton />
  // }

  return (
    <>
      <Navbar />
      <main className='main_content'>
        <h1>
          Administración de cursos 
          <i 
            className="fa-solid fa-plus"
            onClick={() => setShowCreate(true)}
          ></i>
        </h1>
        {
          courses.map((course, index) => {
            animationData.push({ deg: 0, animation: "fade-out .5s forwards" })
            return (
              <section key={index} className='admin_card' onClick={() => onCourseClicked(index)}>
                <div className='admin_header'>
                  <h1>{course.title}</h1>
                  <div>
                    <i 
                      className="fa-solid fa-pen-to-square"
                      onClick={() => {
                        setCourseId(course.id)
                        setShowEdit(true)
                      }}
                    ></i>
                    <i 
                      className="fa-solid fa-trash"
                      onClick={() => {
                        setCourseId(course.id)
                        setShowDelete(true)
                      }}  
                    ></i>
                    <i className="fa-solid fa-caret-right"></i>
                  </div>
                </div>
                <div className='admin_info_container'>
                  <div className='admin_info'>
                    <div className='admin_details'>
                      <h2>Detalles del curso</h2>
                      <p><b>Descripción:</b> {course.description}</p>
                      <p><b>Duración:</b> {course.duration}</p>
                      <p><b>Categoría:</b> {course.category.name}</p>
                      <p><b>Autor:</b> {course.user.username}</p>
                      <p><b>Precio:</b> {course.price}$</p>
                    </div>
                    <div className='admin_recipe'>
                      <h2>Receta</h2>
                      <h3>{course.recipe.name}</h3>
                      <p><b>Descripción:</b> {course.recipe.description}</p>
                      <div className='admin_recipe_details'>
                        <div>
                          <h3>Ingredientes</h3>
                          <ul>
                            {
                              course.recipe.ingredient.map(ingredient => (
                                <li key={ingredient.id}>{ingredient.name}</li>
                              ))
                            }
                          </ul>
                        </div>
                        <div>
                        <h3>Pasos</h3>
                          <ul>
                            {
                              course.recipe.steps.map(step => (
                                <li key={step}>{step}</li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='admin_multimedia_container'>
                    <h2>Contenido multimedia</h2>
                    <div className='admin_multimedia'>
                      <img src={course.media.url_cover} alt="" />
                      <video src={course.media.url_video} controls />
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
        categories={categories}
        users={users}
        recipes={recipes}
      />
      <EditModal 
        showModal={showEdit} 
        setShowModal={setShowEdit} 
        courseId={courseId}
        categories={categories}
        users={users}
        recipes={recipes}
      />
      <DeleteModal 
        showModal={showDelete}
        setShowModal={setShowDelete}
        courseId={courseId}
      />
    </>
  )
}
