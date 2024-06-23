import "@styles/Carousel.css"

export default function Carousel({children}) {
  
  const moveToRight = () => {
    const carrusel  = document.querySelector(".carrusel_container")
    if(!carrusel.style.left){
      carrusel.style.left = "0vw"
    }
    switch(carrusel.style.left){
      case "0vw":
        carrusel.style.left = "-100vw"
        break
      case "-100vw":
        carrusel.style.left = "-200vw"
        break
      case "-200vw":
        carrusel.style.left = "0vw"
        break
      default:
        carrusel.style.left = "0vw"
        break
    }
  }

  const moveToLeft = () => {
    const carrusel  = document.querySelector(".carrusel_container")
    if(!carrusel.style.left){
      carrusel.style.left = "0vw"
    }
    switch(carrusel.style.left){
      case "0vw":
        carrusel.style.left = "-200vw"
        break
      case "-100vw":
        carrusel.style.left = "0vw"
        break
      case "-200vw":
        carrusel.style.left = "-100vw"
        break
      default:
        carrusel.style.left = "0vw"
        break
    }
  }

  return (
    <div className="container">
      <div className="arrow_right" onClick={moveToRight}>{">"}</div>
      <div className="arrow_left" onClick={moveToLeft}>{"<"}</div>
      <div className="carrusel_container">
        {children}
      </div>
    </div>
  )
}