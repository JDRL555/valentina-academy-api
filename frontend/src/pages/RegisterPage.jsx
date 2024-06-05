import "../styles/Register.css"

export default function RegisterPage() {
  return (
    <div className="login">
        <form method="post">
            <h2>Registro</h2>
            <section>
                <label htmlFor="nombres">Nombres</label>
                <input type="username" placeholder="Nombres" required />
            </section>
            <section>
                <label htmlFor="apellidos">Apellidos</label>
                <input type="username" placeholder="Apellidos" required />
            </section>
            <section>
                <label htmlFor="edad">Edad</label>
                <input type="number" placeholder="Edad" required />
            </section>
            <section className="container">
                <label htmlFor="sexo">Sexo</label>
                <div className="opciones">
                    <div className="opcion1">
                        <input type="radio" name="Hombre" id="Hombre" />
                        <label htmlFor="Hobres">Hombre</label>
                        <input type="radio" name="Mujer" id="Mujer" />
                        <label htmlFor="Mujer">Mujer</label>
                    </div>
                </div>
            </section>
            <section>
                <label htmlFor="correo">Correo</label>
                <input type="email" placeholder="Correo" required />
            </section>
            <section>
                <label htmlFor="contraseña">Contraseña</label>
                <input type="password" placeholder="Contraseña" required />
            </section>
            <section>
                <label htmlFor="confirmar">Confirmar Contraseña</label>
                <input type="password" placeholder="Confirmar Contraseña" required />
            </section>
            <button className="boton">Enviar</button>
        </form>
    </div>
  )
}