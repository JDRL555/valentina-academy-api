import Navbar from '../../components/Navbar'

import img from '../../assets/img.png'

import '../../styles/PayCourseSkeleton.css'

export default function PayCoursePage() {
  return (
    <>
      <Navbar />
      <main className='payment_skeleton_container'>
        <section className='payment_skeleton'>
          <div className='payment_skeleton_details'>
            <div className='payment_skeleton_title'></div>
            <div className='payment_skeleton_description'></div>
            <div className='payment_skeleton_price'></div>
            <div className='payment_skeleton_button'>
              <i className="fa-solid fa-cart-shopping" style={{ color: "#919191" }}></i>
            </div>
          </div>
          <div className='payment_skeleton_img'>
            <div 
              className='payment_skeleton_course_img'
              style={{ backgroundImage: `url('${img}')` }}
            >
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
