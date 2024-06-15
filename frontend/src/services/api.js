export async function fetchToApi(route, options = {}, query_params = {}) {
  try {
    let newRoute = `${import.meta.env.VITE_BACKEND_URL}/${route}/`
    if(query_params) {
      for(const [index, [key, value]] of Object.entries(Object.entries(query_params))) {
        newRoute += `${index == 0 ? "?" : "&"}${key}=${value}` 
      }
    } else {
      newRoute = route
    }
    const response = await fetch(newRoute, options)
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}