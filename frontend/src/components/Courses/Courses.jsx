/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import "./Courses.css"

export default function Courses({children, setCategory}) {
  return (
    <div className="course_container">
      <h1>
        Cursos 
        <i 
          className="fa-solid fa-arrow-rotate-right reload_icon"
          onClick={() => setCategory(null)}
        ></i> 
      </h1>
      <div className="courses_container">
      {children}
      </div>
    </div>
  )
}