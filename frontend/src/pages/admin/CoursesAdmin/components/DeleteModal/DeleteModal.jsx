/* eslint-disable react/prop-types */
import { useState } from 'react'

import { fetchToApi } from '@api'
import { BACKEND_ROUTES } from '@constants/routes'

import video from '@assets/video_loading.png'

import Modal from '@components/Modal/Modal'

export default function DeleteModal({ showModal, setShowModal, courseId }) {

  const [deleting, setDeleting] = useState(false)
  
  const onDelete = async () => {
    setDeleting(true)
    await fetchToApi(`${BACKEND_ROUTES.courses}/${courseId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json"
      }
    })
    window.location.href = "/admin"
  }

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      {
        deleting 
        ?
        <div className='admin_deleting_container'>
          <img src={video} className='course_video_icon_skeleton' />
          <h1>Eliminando curso...</h1>
        </div>
        :
        <>
          <h1>Estas seguro de eliminar el curso?</h1>
          <div className='admin_btn_container'>
            <button className='admin_cancel_btn' onClick={() => setShowModal(false)}>Cancelar</button>
            <button className='admin_delete_btn' onClick={onDelete}>Eliminar</button>
          </div>
        </>
      }
    </Modal>
  )
}
