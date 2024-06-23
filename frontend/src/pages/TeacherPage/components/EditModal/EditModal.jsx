import Modal from '@components/Modal/Modal'

export default function EditModal({ showModal, setShowModal, courseId }) {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div>EditModal {courseId}</div>
    </Modal>
  )
}
