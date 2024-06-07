import { useSearchParams, Navigate } from 'react-router-dom'
import "../styles/Survey.css"

export default function Survey() {

  const [params] = useSearchParams()

  if(params.get("course_id")) {
    return (
      <h1>Survey {params.get("course_id")}</h1>
    )
  }
  return <Navigate to="/" />
}
