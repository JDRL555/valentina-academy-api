import { Link } from 'react-router-dom'

import Navbar from '@components/Navbar/Navbar'

import confundidoImg from "@assets/confundido.png"

import "./NotFoundPage.css"

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <main className='main_content'>
        <section className='not_found_container'>
          <div className='not_found_img'>
            <img src={confundidoImg} alt="hombre confundido" />
          </div>
          <div className='not_found_info'>
            <h1 className='not_found_title'>
              Página no encontrada
            </h1>
            <p className='not_found_text'>
              <b>La página a la que trataste de acceder no existe.</b>
            </p>
            <p className='not_found_text'>
              <Link to={"/"}>Te invitamos a visitar nuestra página principal aquí</Link>
            </p>
            <p className='not_found_text'>
              para que descubras todo lo que ofrecemos.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
