/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { fetchToApi } from '../../services/api'
import { BACKEND_ROUTES } from '../../constants/routes'
import { ContextApp } from '../../context/ContextApp'

import Navbar from '../../components/Navbar'

import '../../styles/PayCoursePage.css'

export default function PayCoursePage({ course }) {
  const { user } = useContext(ContextApp)

  const onBuy = async () => {
    const response = fetchToApi(BACKEND_ROUTES.subscribe, {
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
    console.log(response);
  }

  return (
    <>
      <Navbar />
      <main className='payment_container'>
        <section className='payment'>
          <div className='payment_details'>
            <h1>{ course.title }</h1>
            <p>{ course.description }</p>
            <p>
              <b>Precio: {`${course.price}$`}</b>
            </p>
            <button onClick={onBuy}>
              <i class="fa-solid fa-cart-shopping"></i> Comprar ahora
            </button>
          </div>
          <div className='payment_img'>
            <img src={course.media.url_cover} alt="cover" />
          </div>
        </section>
      </main>
    </>
  )
}
