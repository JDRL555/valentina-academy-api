/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { BACKEND_ROUTES } from '@constants/routes'

import { fetchToApi } from '@api'

import pdfIcon from '@assets/pdf.png'

import Navbar from '@components/Navbar/Navbar'
import CoursesSkeleton from './skeleton/CoursesSkeleton'

import userImg from "@public/img/usuario.png"

import './CoursePage.css'

export default function CoursePage({ setCompleted }) {
  const [course, setCourse] = useState()
  const { id } = useParams()
  const navigate = useNavigate()
  const [token] = useCookies(["access_token"])

  useEffect(() => {
    async function getCourse() {
      const response = await fetchToApi(`${BACKEND_ROUTES.courses}/${id}`)
      setCourse(response)
    }
    getCourse()
  }, [])

  const onExportRecipe = async () => {
    const recipeResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/${BACKEND_ROUTES.export_recipe}/${course.recipe.id}/`
    , {
      headers: {
        'Content-type': "application/json",
        'Authorization': `Token ${token.access_token}`
      }
    })

    const blob = await recipeResponse.blob()

    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")

    link.href = url
    link.setAttribute("download", `recipe.pdf`)

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const onCompletedCourse = () => {
    setCompleted(true)
    navigate(`/survey?course_id=${id}`)
  }

  return (
    <>
      <Navbar /> 
      {
        !course 
        ? <CoursesSkeleton />
        :
        <main className='courseContainer'>
          <div className='course'>
            <video 
              src={course.media.url_video}
              className='video' 
              controls
              onEnded={onCompletedCourse}
            ></video>
          </div>
          <div className='courseDetails'>
            <div className='detailsContainer'>
              <div className='details'>
                <h1>{course.title}</h1>
                <p>{course.description}</p>
                <div className='authorContainer'>
                  <img className='authorImg' src={userImg} alt="authorImg" />
                  <h3>{ course.user.username }</h3>
                </div>
              </div>
              <div className='details'>
                <h1>Descarga la receta</h1>
                <p>Si necesitas la receta para analizarla y poder trabajar con ella, aqui tienes el PDF para que puedas usarlo mas adelante!</p>
                <div className='pdfContainer' onClick={onExportRecipe}>
                  <img className='pdfIcon' src={pdfIcon} alt="pdfIcon" />
                  <p>
                    <b>Descargar archivo PDF aquí</b>
                  </p>
                </div>
              </div>
            </div>
            <div className='recipe'>
              <h1>{course.recipe.name}</h1>
              <p>{course.recipe.description}</p>
              <div className='recipeContainer'>
                <div className='recipeIngredients'>
                  <h2>Ingredientes:</h2>
                  <ul>
                    {
                      course.recipe.ingredient.map(ingredient => (
                        <li key={ingredient.id}>
                          <b>{ingredient.name}</b>
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <div className='recipeInstructions'>
                  <h2>Instrucciones:</h2>
                  <ol>
                    {
                      course.recipe.steps.map(step => (
                        <li key={step}>
                          {step}
                        </li>
                      ))
                    }
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </main>
      }
    </>
  )
}
