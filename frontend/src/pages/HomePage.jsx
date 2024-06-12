import Navbar         from '../components/Navbar'
import Footer         from "../components/Footer.jsx"
import Content        from "../components/Content.jsx"
import Carousel       from "../components/Carousel.jsx"
import Post           from "../components/Post.jsx"
import tallerImg  from "../public/img/taller.jpg"

export default function HomePage() {
  return (
    <>
      <Navbar/>
      <Content>
        <Carousel>
          <Post
            title="Te tenemos noticias! Proximamente en Bogota!" 
            description="Nos conplace anunciar que proximamente tendremos preparado un taller para poder compartir mas con nuestra querida comunidad!. No olvides participar tu tambien" 
            img={tallerImg} />
          <Post
            title="Proximamente! Curso presencial sobre dulces" 
            description="Aqui podremos reunirnos para poder conocer sobre mas detalles sobre la preparacion de los ducles y mucho mas!" 
            img={tallerImg} />
          <Post
            title="Taller colaborativo, proximamente" 
            description="Espero lleves tu gorro de chef, porque estaremos presentando un taller colaborativo en el cual tu puedes ser la proxima estrella de la cocina. ¡Animate!" 
            img={tallerImg} />
        </Carousel>
      </Content>
      <Footer />
    </>
  )
}