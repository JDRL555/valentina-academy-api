/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { fetchToApi } from '@api'
import { BACKEND_ROUTES } from '@constants/routes'
import { ContextApp } from '@context/ContextApp'

import { COLORS } from '@constants/message'

import Navbar from '@components/Navbar/Navbar.jsx'
import PayCourseSkeleton from './skeleton/PayCourseSkeleton'

import './PayCoursePage.css'

export default function PayCoursePage({ course }) {
  const { user } = useContext(ContextApp)
  const [error, setError] = useState("Vos sos retrol")
  const navigate = useNavigate()

  const showError = (error) => {
    setError(error)
    const message = document.querySelector(".message")
    message.style.visibility = "visible"
    message.style.opacity = 1
  }

  const hideError = () => {
    const message = document.querySelector(".message")
    message.style.visibility = "hidden"
    message.style.opacity = 0
  }

  const onBuy = async () => {
    const response = await fetchToApi(BACKEND_ROUTES.subscribe, {
      method: "POST",
      body: JSON.stringify({
        course: course.id,
        user: user.id,
        is_purchased: true
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    if(response?.error) {
      showError(response.error)
    } else {
      navigate("/dashboard")
    }
  }

  return (
    <>
      <Navbar />
      {
        !course
        ?
        <PayCourseSkeleton />
        :
        <main className='payment_container'>
          <section className='payment'>
            <div className='payment_details'>
              <h1>{ course.title }</h1>
              <p>{ course.description }</p>
              <p>
                <b>Precio: {`${course.price}$`}</b>
              </p>
              <button onClick={onBuy}>
                <i className="fa-solid fa-cart-shopping"></i> Comprar ahora
              </button>
              <p onClick={hideError} className='message' style={{ backgroundColor: COLORS.error }}>
                <i className="fa-solid fa-exclamation"></i> {error}
              </p>
            </div>
            <div className='payment_img'>
              <div 
                className='payment_course_img'
                style={{ backgroundImage: `url('${course.media.url_cover}')` }}
              >
              </div>
            </div>
          </section>
        </main>
      }
    </>
  )
}
