import { getCookies } from '../utils/cookies'

export async function fetchToApi(route, options = {}, query_params = {}) {
  const cookies = getCookies()
  try {
    let newRoute = `${import.meta.env.VITE_BACKEND_URL}/${route}/`
    if(query_params) {
      for(const [index, [key, value]] of Object.entries(Object.entries(query_params))) {
        newRoute += `${index == 0 ? "?" : "&"}${key}=${value}` 
      }
    } else {
      newRoute = route
    }
    if(cookies?.access_token) {
      options.headers = {...options.headers, "Authorization": `Token ${cookies.access_token}`}
    }
    const response = await fetch(newRoute, options)
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}