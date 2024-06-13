export async function fetchToApi(route, options = {}) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${route}/`, options)
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}