/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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

  useEffect(() => {
    async function getCourse() {
      const response = await fetchToApi(`${BACKEND_ROUTES.courses}/${id}`)
      setCourse(response)
    }
    getCourse()
  }, [])

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
                <div className='pdfContainer'>
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
