import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'

import Survey from '../components/Survey'

import { fetchToApi } from '../services/api'

import { COLORS } from '../constants/message'
import { BACKEND_ROUTES } from '../constants/routes'


import "../styles/SurveyPage.css"

export default function SurveyPage() {

  const expiryTimestamp = new Date()
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 12)

  const navigate = useNavigate()
  const [params] = useSearchParams() 

  const [surveyStart, setSurveyStart] = useState(false) 
  const [error, setError] = useState("")
  const [surveyStatus, setSurveyStatus] = useState({
    percentage: 100,
    completed: false
  })
  const [survey, setSurvey] = useState({})

  let [counter, setCounter] = useState(3)

  let counterInterval = null

  useEffect(() => {
    async function getSurveys() {
      if(!params.get("course_id")) {
        navigate(-1)
        return null
      }

      const response = await fetchToApi(
        BACKEND_ROUTES.surveys, 
        {}, 
        { course_id: params.get("course_id") }
      )

      setSurvey(response[0])
    }
    getSurveys()
  })

  const onStartSurvey = () => {
    setSurveyStart(true)

    counterInterval = setInterval(() => {
      if(counter !== 0) {
        setCounter(counter -= 1) 
      } else {
        clearInterval(counterInterval)
        start()
      }
    }, 1000)
  }

  const onEndSurvey = () => {
    const uls = document.querySelectorAll("ul")
    const error = document.querySelector(".error")
    const answersSelected = []

    uls.forEach(ul => {
      const answers = ul.querySelectorAll("li")
      answers.forEach(
        answer => {
          if(answer.style.border === "5px solid white") {
            answersSelected.push(answer.innerText)
          }
        }
      )
    })

    if(answersSelected.length !== survey.questions.length && minutes == 0 && seconds == 0) {
      setError("Completa todas las respuestas")
      error.style.display = "block"
    } else {
      const timeOver = new Date()
      timeOver.setSeconds(0)
      restart(timeOver)

      let percentage = 0
      answersSelected.map((answerSelected, index) => {
        const answer = survey.questions[index].answers.find(answer => answer.answer == answerSelected)
        if(answer.is_correct) {
          const value = 100 / survey.questions.length
          let result = percentage + value
          percentage = parseInt(result.toFixed(1)) < 0 ? 0 : parseInt(result.toFixed(1))
        }
      })
      if(percentage <= 50) {
        setError("Lo lamento, pero reprobaste la prueba:(")
      } else {
        setError("Felicitaciones, lograste pasar:D")
      }
      error.style.display = "block"
    }
  }

  const {
    seconds,
    minutes,
    restart,
    start
  } = useTimer({
    expiryTimestamp, 
    onExpire: onEndSurvey
  })

  const renderInitialData = () => 
    <>
      <h1>¿Listo para la prueba?</h1>
      <p>
        Se estará realizando una prueba de 20 minutos donde se le harán unas preguntas referentes al curso visto previamente
      </p>
      <p>
        <b>IMPORTANTE:</b> Para poder obtener el certificado, necesitas <b>responder correctamente mas de la mitad de las preguntas</b>
      </p>
      <p>
        <b>
          No te preocupes si no aprobaste, ya que puedes repetir nuevamente la prueba luego de 24 horas
        </b>
      </p>

      <button className='startBtn' onClick={onStartSurvey}>
        Ir a la prueba ahora
      </button>
    </>

  const renderCounter = () => 
    <div className='counterCotainer'>
      <h1 className='counter'>
        {counter}
      </h1>
    </div>

  const renderSurvey = () => <>
    <h1 className='timer'>
      Tiempo restante: {minutes === 0 ? "00" : minutes}:{seconds === 0 ? "00" : seconds}
    </h1>
    <Survey survey={survey} />
    <button onClick={onEndSurvey} className="startBtn" style={{ margin: "0" }}>
      Terminar prueba
    </button>
    <p className='error' style={{ backgroundColor: COLORS.error }}>
      {error}
    </p>
  </>

  return (
    <section className='surveyContainer'>
      <div className='survey'>
        {!surveyStart ? renderInitialData() : counter !== 0 ? renderCounter() : renderSurvey()}
      </div>
    </section>
  )
}
