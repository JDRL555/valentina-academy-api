import "../styles/Login.css"
import { fetchToApi } from '../services/api'

export default function LoginPage() {

    // recibir los datos de correo y clave en el formulario con estados

    const onSubmit = async () => {
        const response = await fetchToApi("login", "POST", {
            email: "carlos@gmail.com",
            password: "carlos"
        })

        if(response?.token) {
            // guardar el token
        } else {
            // mostrar un error en el formulario
        }
    }

    return (
      <>
        <div className="login">
            <form action="post">
                <h2>Inicio de Sesión:</h2>
                <section>
                    <label htmlFor="correo">Correo</label>
                    <input type="text" placeholder="Correo" required />
                </section>
                <section>
                    <label htmlFor="contraseña">Contraseña</label>
                    <input type="password" name="clave" id="clave" placeholder="Contraseña" required />
                </section>
                <button onClick={onSubmit} type="submit">Enviar</button>
            </form>
        </div>
      </>
    )
}