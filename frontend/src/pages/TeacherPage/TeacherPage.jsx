/* eslint-disable react/prop-types */
import { useState } from 'react'

import CreateModal from './components/CreateModal/CreateModal'
import EditModal from './components/EditModal/EditModal'
import DeleteModal from './components/DeleteModal/DeleteModal'

import Navbar from '../../components/Navbar'

import "../../styles/TeacherPage.css"

export default function TeacherPage({ courses }) {
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [courseId, setCourseId] = useState(0)
  const animationData = []

  const onCourseClicked = (index) => {
    const coursesCard = document.querySelectorAll(".teacher_card")
    const courseCard = coursesCard[index]

    const teacherInfo = courseCard.querySelector(".teacher_info")
    const arrow = courseCard.querySelector(".fa-caret-right")

    if(animationData[index].deg == 0 && animationData[index].animation == "fade-out .5s forwards") {
      animationData[index].deg = 90
      animationData[index].animation = "fade-in .5s forwards"
    } else {
      animationData[index].deg = 0
      animationData[index].animation = "fade-out .5s forwards"
    }
    arrow.style.transform = `rotate(${animationData[index].deg}deg)`
    teacherInfo.style.animation = animationData[index].animation
  }

  if(courses.length == 0) {
    return <h1>loading...</h1>
  }

  return (
    <>
      <Navbar />
      <main className='teacher_container'>
        <h1>
          Administración de cursos 
          <i 
            className="fa-solid fa-plus"
            onClick={() => setShowCreate(true)}
          ></i>
        </h1>
        {
          courses.map((course, index) => {
            animationData.push({ deg: 0, animation: "fade-out .5s forwards" })
            return (
              <section key={index} className='teacher_card' onClick={() => onCourseClicked(index)}>
                <div className='teacher_header'>
                  <h1>{course.title}</h1>
                  <div>
                    <i 
                      className="fa-solid fa-pen-to-square"
                      onClick={() => {
                        setCourseId(course.id)
                        setShowEdit(true)
                      }}
                    ></i>
                    <i 
                      className="fa-solid fa-trash"
                      onClick={() => {
                        setCourseId(course.id)
                        setShowDelete(true)
                      }}  
                    ></i>
                    <i className="fa-solid fa-caret-right"></i>
                  </div>
                </div>
                <div className='teacher_info'>
                  <div className='teacher_details'>
                    <h2>Detalles del curso</h2>
                    <p><b>Descripción:</b> {course.description}</p>
                    <p><b>Categoría:</b> {course.category.name}</p>
                    <p><b>Precio:</b> {course.price}$</p>
                  </div>
                  <div className='teacher_multimedia_container'>
                    <h2>Contenido multimedia</h2>
                    <div className='teacher_multimedia'>
                      <img src={course.media.url_cover} alt="" />
                      <video src={course.media.url_video} controls />
                    </div>
                  </div>
                </div>
              </section>
            )
          })
        }
      </main>
      <CreateModal 
        showModal={showCreate} 
        setShowModal={setShowCreate} 
      />
      <EditModal 
        showModal={showEdit} 
        setShowModal={setShowEdit} 
        courseId={courseId}
      />
      <DeleteModal 
        showModal={showDelete}
        setShowModal={setShowDelete}
        courseId={courseId}
      />
    </>
  )
}
