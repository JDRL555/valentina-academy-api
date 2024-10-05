/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import img from '@assets/img.png'
import "./CourseSkeleton.css"

export default function CourseSkeleton() {
  return (
    <div className="course_card_skeleton">
      <div className='img_skeleton_container'>
        <img src={img} alt="img" className='img_skeleton' />
      </div>
      <div className="course_info_skeleton">
        <div className="title_skeleton"></div>
        <div className="description_skeleton"></div>
        <div className="description_skeleton"></div>
        <div className="description_skeleton"></div>
        <div className="description_skeleton"></div>
        <div className="description_skeleton"></div>
      </div>
    </div>
  )
}