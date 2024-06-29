import Navbar           from '@components/Navbar/Navbar.jsx'
import Footer           from "@components/Footer/Footer.jsx"
import Carousel         from "@components/Carousel/Carousel.jsx"
import HeaderCard       from "@components/HeaderCard/HeaderCard.jsx"

import presentacion_1   from "@public/img/presentacion_1.png"
import presentacion_2   from "@public/img/presentacion_2.jpg"
import presentacion_3   from "@public/img/presentacion_3.jpg"
import './LandingPage.css'

export default function LandingPage() {
  return (
    <>
      <Navbar/>
      <header>
        <Carousel>
          <HeaderCard
            presentation="Bienvenido a la Academia Valentina, ¿Listo para descubrir lo que ofrecemos?"
            img={presentacion_1} 
          />
          <HeaderCard
            presentation="Aquí aprenderás a crear todo tipo de recetas de la forma más profesional posible" 
            img={presentacion_2} 
          />
          <HeaderCard
            presentation="Así mismo, podrás aprender a como crear los más sabrosos y dulces postres para disfrutar" 
            img={presentacion_3} 
          />
        </Carousel>
      </header>
      <main className='main'>
        <section className='landing_content'>
          <h1>¿Quienes somos?</h1>
          <p>
            Somos una academia dedicada a formar a todos aquellos amantes de la cocina que son apasionados por la diversidad gastronómica
          </p>
        </section>
        <section className='landing_content'>
          <h1>¿Qué ofrecemos?</h1>
          <p>
            Cursos virtuales donde se presentan una gran variedad de recetas de todo el mundo desde precios bastante accesibles, hasta cursos totalmente gratis. Dividimos nuestro contenido en dos categorías principales:
            <ol>
              <li>Gastronomía: Donde se presentarán aquellas recetas de comidas tipicas y de todo el mundo en general</li>
              <li>Repostería: Donde se presentarán aquellas recetas para los amantes de lo dulce</li>
            </ol>
          </p>
        </section>
        <section className='landing_content'>
          <h1>¿Qué necesitas para acceder al sitio?</h1>
          <p>
            Inicia creandote una cuenta y accede con tus credenciales para que descubras todo lo que tenemos para ti
          </p>
        </section>
        <section className='landing_final_content'>
          <h2>
            Si tu sueño siempre ha sido aprender sobre cocina y ser un chef profesional, este es el sitio para ti.
          </h2>
          <h3>Accede dándole click al boton de registrate</h3>
        </section>
      </main>
      <Footer />
    </>
  )
}