import { useCookies } from 'react-cookie'
import Navbar         from '../components/Navbar.jsx'
import Header         from "../components/Header.jsx"
import Footer         from "../components/Footer.jsx"
import Content        from "../components/Content.jsx"
import Courses        from "../components/Courses.jsx"
import Course         from "../components/Course.jsx"
import img        from "../public/img/reposteria.jpg"

export default function LandingPage() {

  const [token] = useCookies(["access_token"])

  console.log(token.access_token);

  return (
    <>
      <Navbar />
      <Header/>
      <Content>
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