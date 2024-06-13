/* eslint-disable react/prop-types */
import "../styles/Course.css"

export default function Course({img, title, description}) {
  const words = description.split(" ")
  if(words.length >= 20){
    words.splice(19)
  }
  return (
    <div className="course_card">
      <img src={img} className="course_card_img" />
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
    </div>
  )
}