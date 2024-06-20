import Modal from '../Modal/Modal'

export default function DeleteModal({ showModal, setShowModal, courseId }) {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div>DeleteModal {courseId}</div>
    </Modal>
  )
}
