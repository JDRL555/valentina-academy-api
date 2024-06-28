import loading from '../../assets/loading.png'
import "./Loading.css"

export default function Loading() {
  return (
    <section className="loading_container">
      <div>
        <img src={loading} />
        <h1>Cargando...</h1>
      </div>
    </section>
  )
}
