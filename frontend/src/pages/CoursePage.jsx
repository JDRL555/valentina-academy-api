import { useParams, useNavigate } from 'react-router-dom'

import pdfIcon from '../assets/pdf.png'

import '../styles/Course.css'

export default function CoursePage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const onCompletedCourse = () => navigate(`/survey?course_id=${id}`)

  return (
    <section className='courseContainer'>
      <div className='course'>
        <video 
          src="https://res.cloudinary.com/dxqa0mb8i/video/upload/v1695475434/Arte_del_Origen_Definitivo_obomd3.mp4"
          className='video' 
          controls
          onEnded={onCompletedCourse}
        ></video>
      </div>
      <div className='courseDetails'>
        <div className='detailsContainer'>
          <div className='details'>
            <h1>Curso de pasteles</h1>
            <p>En este curso se busca enseñar como hacer pasteles de forma casera y de la forma mas economica posible!</p>
            <div className='authorContainer'>
              <img className='authorImg' src="https://t1.uc.ltmcdn.com/es/posts/5/1/8/como_saber_si_una_mujer_es_sincera_34815_600.webp" alt="authorImg" />
              <h3>Andreina Molina</h3>
            </div>
          </div>
          <div className='details'>
            <h1>Descarga la receta</h1>
            <p>Si necesitas la receta para analizarla y poder trabajar con ella, aqui tienes el PDF para que puedas usarlo mas adelante!</p>
            <div className='pdfContainer'>
              <img className='pdfIcon' src={pdfIcon} alt="pdfIcon" />
              <p>
                <b>Descargar archivo PDF aquí</b>
              </p>
            </div>
          </div>
        </div>
        <div className='recipe'>
          <h1>Receta</h1>
          <div className='recipeContainer'>
            <div className='recipeIngredients'>
              <h2>Ingredientes:</h2>
              <ul>
                <li>
                  <b>Harina (3 kg)</b>
                </li>
                <li>
                  <b>Azucar (200 gr)</b>
                </li>
                <li>
                  <b>Leche (500 ml)</b>
                </li>
                <li>
                  <b>Huevos (4 unidades)</b>
                </li>
              </ul>
            </div>
            <div className='recipeInstructions'>
              <h2>Instrucciones:</h2>
              <p>
                Mezcla todos los ingredientes hasta formar una masa homogénea, puedes hacerlo en la licuadora o si deseas también puedes utilizar la batidora eléctrica o un batidor de globo. Para hacerlo, empieza mezclando los ingredientes líquidos que son los huevos, el aceite, la vainilla, la leche y finalmente el azúcar. Mezcla bien todos estos ingredientes que deben estar a temperatura ambiente.

                A continuación, incorpora la mantequilla derretida tibia mientras bates para lograr que se distribuya bien y no se quede solo en la superficie.

                Por último, coloca la harina y el polvo de hornear en un bowl grande y vierte encima la mezcla de ingredientes líquidos. Si lo estás haciendo a mano bate desde el centro hacia afuera para no tener grumos, ya que es una masa bastante fluida.

                Prepara un molde de 20 cm de diámetro para hornear. Engrasa toda la superficie y las paredes con mantequilla o aceite, coloca una tira o un disco de papel manteca en la base y espolvorea con un poco de harina.

                Vierte la mezcla en el molde y hornea en un horno previamente graduado con la temperatura en 180 °C durante 1 hora aproximadamente o hasta que compruebes que esté listo. Para saber si el bizcocho está listo, es sencillo, solo pincha la torta con un palillo de madera y, si este sale con restos de masa, continúa horneando por unos minutos más hasta que observes que salga limpio.

                Cuando esté listo el pastel de vainilla, retira del horno y deja reposar unos minutos. Luego, desmolda y decora al gusto. ¡A comer! Cuéntanos en los comentarios tu opinión y comparte con nosotros una fotografía del resultado final.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
