/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import "../styles/Course.css"

export default function Course({id, img, title, description}) {
  const words = description.split(" ")
  if(words.length >= 20){
    words.splice(19)
  }

  return (
    <Link to={`/course/${id}`} className="course_card">
      <div className="course_card_img" style={{ backgroundImage: `url('${img}')` }}></div>
      <div className="course_info">
        <h2 className="course_info_title">{title}</h2>
        {
          description.split(" ").length >= 20 
          ? 
          <>
            <p>{words.join(" ")}<a href=""> ... ver mas</a></p>
          </>
          :
            <p>{description}</p>
        }
      </div>
    </Link>
  )
}