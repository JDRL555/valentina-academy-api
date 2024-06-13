import "../styles/Header.css"

export default function Header() {
  return (
    <header className="header">
      <div className="header_info">
        <h1>Bienvenido, Joshua!</h1>
        <p>Descubre nuestros cursos, y explora entre las dos principales categorias que tenemos para ofrecer</p>
      </div>
      <section className="categories">
        <div className="comida_salada">
          <div className="img_content">
            <h3>REPOSTERIA</h3>
          </div>
        </div>
        <div className="reposteria">
          <div className="img_content">
            <h3>COMIDA SALADA</h3>
          </div>
        </div>
      </section>
    </header>
  )
}