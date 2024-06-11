import { useCookies } from 'react-cookie'
import "../styles/LandingPage.css"

export default function LandingPage() {

  const [token] = useCookies(["access_token"])

  console.log(token.access_token);

  return (
    <>
        <h1>LandingPage</h1>
    </>
  )
}