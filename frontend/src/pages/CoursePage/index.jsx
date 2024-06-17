import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import CoursePage from './CoursePage'

import { ContextApp } from '../../context/ContextApp'
import { BACKEND_ROUTES } from '../../constants/routes'
import { fetchToApi } from '../../services/api'

export default function index({ setCompleted }) {
  const { id } = useParams()
  const { user } = useContext(ContextApp)

  fetchToApi(BACKEND_ROUTES.purchased_courses)
  .then(data => {
    console.log(data);
  })

  return (
    <CoursePage setCompleted={setCompleted} />
  )
}
