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
  surveyId,
  courses
}) {
  const [creating, setCreating] = useState(false)
  const [questions, setQuestions] = useState(0)
  const [answers, setAnswers] = useState([0])

  const [survey, setSurvey] = useState({
    title: "",
    description: "",
    course_id: 0,
    questions: []
  })
  const [courseStatus, setSurveyStatus] = useState({ status: null, error: "" })

  useEffect(() => {
    async function getSurvey() {
      const surveyResponse = await fetchToApi(`${BACKEND_ROUTES.surveys}/${surveyId}`)
    }
  }, [])

  const onAddQuestion = () => {
    setQuestions(questions + 1)
    const newArr = answers
    newArr.push(2)
    setAnswers(newArr)
  }

  const onRemoveQuestion = () => {
    if(questions !== 1) {
      setQuestions(questions - 1)
      const newArr = answers
      newArr.pop()
      setAnswers(newArr)
    }
  }

  const onAddAnswer = (question_index) => {
    const newArr = answers
    newArr[question_index] += 1
    setAnswers([ ...newArr ])
  }

  const onRemoveAnswer = (question_index) => {
    const newArr = answers
    if(newArr[question_index] !== 2) {
      newArr[question_index] -= 1
      setAnswers([ ...newArr ])
    }
  }

  const onInputChange = e => {
    setSurvey({ ...survey, [e.target.id]: e.target.value })
  }

  const onQuestionChange = e => {
    if(!survey.questions[e.target.id]) {
      survey.questions.push({ 
        question: e.target.value, 
        answers: [] 
      })
    } else {
      survey.questions[e.target.id] = { 
        ...survey.questions[e.target.id], 
        question: e.target.value 
      }
    }
  }

  const onAnswerChange = (question_index, index, value, is_correct) => {
    if(!survey.questions[question_index].answers[index]) {
      survey.questions[question_index].answers.push({
        answer: value,
        is_correct
      })
    } else {
      survey.questions[question_index].answers[index] = {
        ...survey.questions[question_index].answers[index],
        answer: value
      }
    }
  }

  const onIsTrueChange = (question_index, index) => {
    survey.questions[question_index].answers = survey.questions[question_index].answers.map((answer, answerIndex) => {
      if(answerIndex === index) {
        answer = { ...answer, is_correct: true }
      } else {
        answer = { ...answer, is_correct: false }
      }
      return answer
    })
  }

  const onCreateSurvey = async e => {
    setCreating(true)
    e.preventDefault()

    let questionsArr = []
    
    const questionPromises = survey.questions.map(async question => {
      let answersArr = []
      const answersPromises = question.answers.map(async answer => {
        return await fetchToApi(BACKEND_ROUTES.answers, {
          method: "POST",
          body: JSON.stringify(answer),
          headers: {
            'Content-type': "application/json"
          }
        })
      })

      const responses = await Promise.all(answersPromises)
      responses.map(response => answersArr.push(response.id))

      const questionPromise = await fetchToApi(BACKEND_ROUTES.questions, {
        method: "POST",
        body: JSON.stringify({
          question: question.question, answers_id: answersArr
        }),
        headers: {
          'Content-type': "application/json"
        }
      })

      return questionPromise
      
    })

    const responses = await Promise.all(questionPromises)
    responses.map(response => questionsArr.push(response.id))
    
    const surveysResponse = await fetchToApi(BACKEND_ROUTES.surveys, {
      method: "POST",
      body: JSON.stringify({
        ...survey, question_id: questionsArr
      }),
      headers: {
        'Content-type': "application/json"
      }
    })

    if(surveysResponse?.detail) {
      setSurveyStatus({ status: false, error: "Hubo un error, intenta nuevamente" })
      return
    }

    setShowModal(false)
    setCreating(false)
    window.location.href = "/surveys/admin"
    
  }

  const createForm = () =>     
    <>
      <form className='modal_form' onSubmit={onCreateSurvey}>
        <div className='input_container'>
          <label htmlFor="title">Titulo de la encuesta</label>
          <input required onChange={onInputChange} id='title' />
        </div>
        <div className='input_container'>
          <label htmlFor="description">Descripción de la encuesta</label>
          <textarea required onChange={onInputChange} id='description' />
        </div>
        <div>
        <div className='input_container'>
          <label htmlFor="course_id">Curso</label>
          <select required id="course_id" onChange={onInputChange}>
            <option disabled selected value="">-- Selecciona un curso -- </option>
            {
              courses.map(course => (
                <option key={course.id} value={course.id}>
                  { course.title }
                </option>
              ))
            }
          </select>
        </div>
          <label htmlFor="questions">
            Preguntas
            <i 
              className="fa-solid fa-plus"
              onClick={onAddQuestion}
            ></i>
            <i 
              className="fa-solid fa-minus"
              onClick={onRemoveQuestion}
            ></i>
          </label>
          <div>
            {
              [...Array(questions)].map((_, questionIndex) => (
                <div key={questionIndex} className='admin_questions'>
                  <label htmlFor={questionIndex}>Pregunta {questionIndex + 1}</label>
                  <input required onChange={onQuestionChange} id={questionIndex} />
                  <label className='admin_answers_label'>
                    Respuestas
                    <i 
                      className="fa-solid fa-plus"
                      onClick={() => onAddAnswer(questionIndex)}
                    ></i>
                    <i 
                      className="fa-solid fa-minus"
                      onClick={() => onRemoveAnswer(questionIndex)}
                    ></i>
                  </label>
                  <fieldset>
                    {
                      [...Array(answers[questionIndex])].map((_, answerIndex) => (
                        <div key={questionIndex} className='input_survey_answers_container'>
                          <label>
                            Respuesta {answerIndex + 1}
                          </label>
                          <div key={answerIndex} className='input_survey_answers'>
                            <input 
                              className='input_survey_answer'
                              required
                              onChange={e => onAnswerChange(questionIndex, answerIndex, e.target.value, answerIndex === 0 ? true : false)}
                            ></input>
                            <div className='input_survey_answer'>
                              <input 
                                type="radio"
                                defaultChecked={answerIndex === 0}
                                id={`pregunta_${questionIndex}_respuesta_${answerIndex + 1}`} 
                                name={`question_${questionIndex}`}
                                onChange={() => onIsTrueChange(questionIndex, answerIndex)}
                              />
                              <label htmlFor={`pregunta_${questionIndex}_respuesta_${answerIndex + 1}`}>
                                Respuesta verdadera
                              </label>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </fieldset>
                </div>
              ))
            }
          </div>
        </div>
        <button type='submit'>
          Crear encuesta
        </button>
      </form>
    </>

  const recipeResponse = () => 
    <div className='response_creation'>
      {
        courseStatus.status === null
        ?
        (
          <>
            <img src={video} className='course_video_icon_skeleton' />
            <h1>Creando encuesta...</h1>
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


  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <h1>Crea una nueva encuesta</h1>
      {
        !creating 
        ? createForm()
        : recipeResponse()
      }
    </Modal>
  )
}