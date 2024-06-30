/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

import { fetchToApi } from '@api'
import { BACKEND_ROUTES } from '@constants/routes'

import Navbar from '@components/Navbar/Navbar'

import AdminSkeleton from '../skeleton/AdminSkeleton'

import CreateModal from './components/CreateModal/CreateModal'
// import EditModal from './components/EditModal/EditModal'
// import DeleteModal from './components/DeleteModal/DeleteModal'

export default function SurveysAdmin() {
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [surveyId, setSurveyId] = useState(0)

  const [surveys, setSurveys] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    async function getCourseInfo() {
      const surveysResponse = await fetchToApi(BACKEND_ROUTES.surveys)
      const coursesResponse = await fetchToApi(BACKEND_ROUTES.courses)
      setSurveys(surveysResponse)
      setCourses(coursesResponse)
    }
    getCourseInfo()
  }, [])
  const animationData = []

  const onSurveyClicked = (index) => {
    const surveysCard = document.querySelectorAll(".admin_card")
    const surveyCard = surveysCard[index]

    const teacherInfo = surveyCard.querySelector(".admin_info_container")
    const arrow = surveyCard.querySelector(".fa-caret-right")

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

  if(surveys?.length == 0) {
    return <AdminSkeleton />
  }

  return (
    <>
      <Navbar />
      <main className='main_content'>
        <h1>
          Administración de encuestas 
          <i 
            className="fa-solid fa-plus"
            onClick={() => setShowCreate(true)}
          ></i>
        </h1>
        {
          surveys.map((survey, index) => {
            animationData.push({ deg: 0, animation: "fade-out .5s forwards" })
            return (
              <section key={index} className='admin_card' onClick={() => onSurveyClicked(index)}>
                <div className='admin_header'>
                  <h1>{survey.title}</h1>
                  <div>
                    <i 
                      className="fa-solid fa-pen-to-square"
                      onClick={() => {
                        setSurveyId(survey.id)
                        setShowEdit(true)
                      }}
                    ></i>
                    <i 
                      className="fa-solid fa-trash"
                      onClick={() => {
                        setSurveyId(survey.id)
                        setShowDelete(true)
                      }}  
                    ></i>
                    <i className="fa-solid fa-caret-right"></i>
                  </div>
                </div>
                <div className='admin_info_container'>
                  <div className='admin_info'>
                    <div className='admin_details'>
                      <h2>Detalles de la encuesta</h2>
                      <p><b>Título:</b> {survey.title}</p>
                      <p><b>Descripción:</b> {survey.description}</p>
                    </div>
                    <div className='admin_recipe'>
                      <div className='admin_surveys_details'>
                        <div>
                          <h3>Preguntas y respuestas</h3>
                          <ul>
                            {
                              survey.questions?.map(question => (
                                <>
                                  <li key={question.id}>{question.question}</li>
                                  <ul className='admin_survey_answers'>
                                    {
                                      question.answers.map(answer => (
                                        <li key={answer.id}>
                                          {answer.answer} ({answer.is_correct ? "Respuesta correcta" : "Respuesta incorrecta"})
                                        </li>
                                      ))
                                    }
                                  </ul>
                                </>
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
        courses={courses}
      />
      {/* <EditModal 
        showModal={showEdit} 
        setShowModal={setShowEdit}
        questions={questions} 
        surveyId={surveyId}
      />
      <DeleteModal 
        showModal={showDelete}
        setShowModal={setShowDelete}
        surveyId={surveyId}
      /> */}
    </>
  )
}
