import "../styles/Login.css"

export default function LoginPage() {
    return (
      <>
        <div className="login">
            <form action="post">
                <h2>Inicio de Sesión:</h2>
                <section>
                    <label for="correo">Correo</label>
                    <input type="text" placeholder="Correo" required />
                </section>
                <section>
                    <label for="contraseña">Contraseña</label>
                    <input type="password" name="clave" id="clave" placeholder="Contraseña" required />
                </section>
                <button type="submit">Enviar</button>
            </form>
        </div>
      </>
    )
}