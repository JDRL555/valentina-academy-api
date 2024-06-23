import Navbar           from '@components/Navbar.jsx'
import Footer           from "@components/Footer.jsx"
import Carousel         from "@components/Carousel.jsx"
import HeaderCard       from "@components/HeaderCard.jsx"

import presentacion_1   from "../public/img/presentacion_1.png"
import presentacion_2   from "../public/img/presentacion_2.jpg"
import presentacion_3   from "../public/img/presentacion_3.jpg"
import '@styles/LandingPage.css'

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
        
      </main>
      <Footer />
    </>
  )
}