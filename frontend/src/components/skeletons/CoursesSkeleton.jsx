import video from '@assets/video_loading.png'
import pdfIcon from '@assets/pdf_skeleton.png'
import "@styles/CoursesSkeleton.css"

export default function CoursesSkeleton() {
  return (
    <main className='course_container_skeleton'>
      <div className='course_video_container_skeleton'>
        <div className='course_video_skeleton'>
          <img src={video} className='course_video_icon_skeleton' />
        </div>
      </div>
      <div className='course_details_skeleton'>
        <div className='details_container_skeleton'>
          <div className='details_skeleton'>
            <div className='course_title_skeleton'></div>
            <div className='course_description_skeleton'></div>
            <div className='author_container_skeleton'>
              <div className='author_img_skeleton' />
              <div className='author_skeleton'></div>
            </div>
          </div>
          <div className='details_skeleton'>
            <div className='details_title_skeleton'></div>
            <div className='details_description_skeleton'></div>
            <div className='pdf_container_skeleton'>
              <img className='pdf_icon_skeleton' src={pdfIcon} alt="" />
            </div>
          </div>
        </div>
        <div className='recipe_skeleton'>
          <div className='recipe_name_skeleton'></div>
          <div className='recipe_description_skeleton'></div>
          <div className='recipe_container_skeleton'>
            <div className='recipe_ingredients_skeleton'>
              <div className='recipe_title_skeleton'></div>
              <ul className='recipe_ingredients_list_skeleton'>
                <li>
                  <div className='recipe_ingredient_skeleton'></div>
                </li>
                <li>
                  <div className='recipe_ingredient_skeleton'></div>
                </li>
                <li>
                  <div className='recipe_ingredient_skeleton'></div>
                </li>
                <li>
                  <div className='recipe_ingredient_skeleton'></div>
                </li>
              </ul>
            </div>
            <div className='recipe_instructions_skeleton'>
              <div className='recipe_instructions_title_skeleton'></div>
              <ol className='recipe_instructions_list_skeleton'>
                <li>
                  <div className='recipe_instruction_skeleton'></div>
                </li>
                <li>
                  <div className='recipe_instruction_skeleton'></div>
                </li>
                <li>
                  <div className='recipe_instruction_skeleton'></div>
                </li>
                <li>
                  <div className='recipe_instruction_skeleton'></div>
                </li>
                <li>
                  <div className='recipe_instruction_skeleton'></div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
