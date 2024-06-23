import { ContextApp } from '../context/ContextApp'
import { useContext } from 'react'
import "@styles/Header.css"

export default function Header({ setCategory }) {
  const { user } = useContext(ContextApp)
  return (
    <header className="header">
      <div className="header_info">
        <h1>Bienvenido, {user.username}!</h1>
        <p>Descubre nuestros cursos, y explora entre las dos principales categorias que tenemos para ofrecer</p>
      </div>
      <section className="categories">
        <div onClick={() => setCategory(2)} className="comida_salada">
          <div className="img_content">
            <h3>REPOSTERIA</h3>
          </div>
        </div>
        <div onClick={() => setCategory(1)} className="reposteria">
          <div className="img_content">
            <h3>GASTRONOMIA</h3>
          </div>
        </div>
      </section>
    </header>
  )
}