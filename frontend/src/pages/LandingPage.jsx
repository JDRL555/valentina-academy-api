import { useCookies } from 'react-cookie'
import Header         from "../components/Header.jsx"
import Footer         from "../components/Footer.jsx"
import Content        from "../components/Content.jsx"
import Carousel       from "../components/Carousel.jsx"
import Post           from "../components/Post.jsx"
import Courses        from "../components/Courses.jsx"
import Course         from "../components/Course.jsx"
import img        from "../public/img/reposteria.jpg"
import tallerImg  from "../public/img/taller.jpg"

export default function LandingPage() {

  const [token] = useCookies(["access_token"])

  console.log(token);

  return (
    <>
      <Navbar />
      <Content>
        <Header />
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
        <Courses>
          <Course 
          img={img} 
          title="Curso de Tortas frias" 
          description="Espero estes listo para este gran curso de tortas!. En este curso veras lo esencial sobre como preparar correctamente dicha torta. Veras a su vez todas las tecnicas que se deben tomar, asi como tambien consejos para poder mejorar en la cocina. ¿Que esperas?" />
          <Course 
          img={img} 
          title="Curso de Dulces caseros" 
          description="Aqui sabras todo respectivo a dulces caseros. Veras su preparacion, consejos para principiantes, y tips que te van a permitir trascender en los dulces caseros" />
          <Course 
          img={img} 
          title="Curso de Cremas pasteleras" 
          description="Solo por esta semana, aprovecha nuestro excelente curso que contiene todo lo referente a las cremas pasteleras. ¿Para que esperar a alguien mas que lo haga cuando tu mismo puedes preparar tu propia crema?" />
        </Courses>
      </Content>
      <Footer />
    </>
  )
}