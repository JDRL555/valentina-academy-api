/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { useTimer } from 'react-timer-hook'
import { useCookies } from 'react-cookie'

import { ContextApp } from '@context/ContextApp'

import Survey from './components/Survey/Survey'
import PrevCertificate from './components/PrevCertificate/PrevCertificate'

import { fetchToApi } from '@api'

import { COLORS } from '@constants/message'
import { BACKEND_ROUTES } from '@constants/routes'

import "./SurveyPage.css"

export default function SurveyPage() {

  const expiryTimestamp = new Date()
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 1200)

  const navigate = useNavigate()
  const [params] = useSearchParams() 

  const [surveyStart, setSurveyStart] = useState(false) 
  const [error, setError] = useState("")
  const [survey, setSurvey] = useState({})

  const [certificateData, setCertificateData] = useState({
    user_full_name: "",
    course_title: "",
    course_author: "",
    day: "",
    month: "",
    year: ""
  })

  let [counter, setCounter] = useState(3)
  let [percentage, setPercentage] = useState(0)

  const [url, setUrl] = useState('');

  const { user } = useContext(ContextApp)

  const [ token ] = useCookies(["access_token"])

  let counterInterval = null
  const answersSelected = []

  useEffect(() => {
    async function getSurveys() {
      if(!params.get("course_id")) {
        navigate("/dashboard")
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
  }, [])
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

  const validateAnswers = () => {
    const uls = document.querySelectorAll("ul")
    const error = document.querySelector(".error")

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

    if(answersSelected.length !== survey.questions.length) {
      setError("Completa todas las respuestas")
      error.style.display = "block"
    } else {
      onEndSurvey()
    }
  }

  const onEndSurvey = async () => {
    const timeOver = new Date()
    timeOver.setSeconds(0)
    restart(timeOver)

    answersSelected.map((answerSelected, index) => {
      const answer = survey.questions[index].answers.find(answer => answer.answer == answerSelected)
      if(answer.is_correct) {
        const value = parseInt(100 / survey.questions.length)
        setPercentage( percentage += value )
      }
    })
    if(percentage <= 50) {
      setError("Reprobaste la prueba :(")
    } else {
      const certificateResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/${BACKEND_ROUTES.export_certificate}/`, 
      {
        method: "POST",
        body: JSON.stringify({
          user_id: user.id,
          course_id: survey.course.id
        }),
        headers: {
          'Content-type': "application/json",
          'Authorization': `Token ${token.access_token}`
        }
      })

      const blob = await certificateResponse.blob()

      const certificateUrl = URL.createObjectURL(blob)
      setUrl(certificateUrl)

      const date = new Date()
      const newDate = date.toISOString().split('T')[0]

      const created_at_list = newDate.split("-")
      const day = created_at_list[2]
      const month = created_at_list[1]
      const year = created_at_list[0]

      setError("Aprobaste la prueba :D")
      setCertificateData({
        user_full_name: `${user.first_name} ${user.last_name}`,
        course_title: `${survey.course.title}`,
        course_author: `${survey.course.user.first_name} ${survey.course.user.last_name}`,
        day, month, year
      })
    }
    answersSelected.length = 0
  }

  const onExportCertificate = () => {
    const link = document.createElement("a")

    link.href = url
    link.setAttribute("download", `certificate.pdf`)

    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    navigate("/dashboard")
  }

  const {
    seconds,
    minutes,
    restart,
    start
  } = useTimer({
    expiryTimestamp, 
    onExpire: onEndSurvey,
    autoStart: false
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
      Tiempo restante: 
      {minutes === 0 ? "00" : minutes < 10 ? `0${minutes}` : minutes}
      :
      {seconds === 0 ? "00" : seconds < 10 ? `0${seconds}` : seconds}
    </h1>
    <Survey survey={survey} />
    <button onClick={validateAnswers} className="startBtn" style={{ margin: "0" }}>
      Terminar prueba
    </button>
    <p className='error' style={{ backgroundColor: COLORS.error }}>
      {error}
    </p>
  </>

  const renderResults = () => {
    if(!error) {
      return (
        <div className='survey_result_container'>
          <h1>Cargando resultados...</h1>
        </div>
      )
    }

    return (
      <div className='survey_result_container'>
        <h1>{ error }</h1>
        <p><b>{ percentage }/100</b></p>
        <p className='survey_result_text'>
          { 
            percentage > 50
            ?
            "Felicitaciones! ahora tendrás acceso a tu certificado"
            :
            "Lamentablemente no aprobaste. Se necesita más del 50% de respuestas válidas para obtener tu certificado." 
          }
        </p>
        {
          percentage > 50
          &&
          <PrevCertificate 
            data={certificateData}
          />
        }
          { 
            percentage <= 50
            &&
            <p className='survey_result_text'>
              Recuerda que puedes presentar esta prueba en las próximas 24 horas, así mismo, te recomendamos que veas detenidamente el curso para asegurar que logres pasar.
            </p>
          }
            { 
              percentage <= 50
              &&
              <p className='survey_result_text'>
                <b>
                  No te desanimes y esfuerzate para obtener tu certificado. No pares de aprender! 
                </b>
              </p>
            }
        {
          percentage <= 50
          ?
          <Link to={"/dashboard"} className='startBtn'>
              Volver al inicio
          </Link>
          :
          <button className='startBtn' onClick={onExportCertificate}>
            Obtener certificado!
          </button>

        }
      </div>
    )
  }

  return (
    <section className='surveyContainer'>
      <div className='survey'>
        {
          !surveyStart 
          ? 
          renderInitialData() 
          : 
          counter !== 0 
          ? 
          renderCounter() 
          : 
          minutes === 0 && seconds === 0
          ?
          renderResults()
          :
          renderSurvey()
        }
      </div>
    </section>
  )
}
