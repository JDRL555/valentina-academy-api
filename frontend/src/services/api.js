export async function fetchToApi(route, method = "GET", body = {}) {
  try {
    const response = await fetch("http://localhost:8000/" + route, {
      method,
      body: JSON.stringify(body)
    })
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}