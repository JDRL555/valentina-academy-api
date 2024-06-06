export async function fetchToApi(route, method = "GET", body = {}) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${route}/`, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}