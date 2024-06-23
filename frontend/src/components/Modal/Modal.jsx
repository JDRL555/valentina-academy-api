/* eslint-disable react/prop-types */
import './Modal.css'

export default function Modal({ children, showModal, setShowModal }) {
  return (
    <section 
      className='modal_container' 
      style={{ animation: showModal ? "show .5s forwards" : "hide .5s forwards" }}
    >
      <div className='modal'>
        <span className='modal_close_btn' onClick={() => setShowModal(false)}>X</span>
        {children}
      </div>
    </section>
  )
}
