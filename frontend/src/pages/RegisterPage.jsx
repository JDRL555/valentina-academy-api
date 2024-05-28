import "../styles/Register.css"

export default function RegisterPage() {
  return (
    <div className="login">
        <form method="post">
            <h2>Registro</h2>
            <section>
                <label for="nombres">Nombres</label>
                <input type="username" placeholder="Nombres" required />
            </section>
            <section>
                <label for="apellidos">Apellidos</label>
                <input type="username" placeholder="Apellidos" required />
            </section>
            <section>
                <label for="edad">Edad</label>
                <input type="number" placeholder="Edad" required />
            </section>
            <section className="container">
                <label for="sexo">Sexo</label>
                <div class="opciones">
                    <div class="opcion1">
                        <input type="radio" name="Hombre" id="Hombre" />
                        <label for="Hobres">Hombre</label>
                        <input type="radio" name="Mujer" id="Mujer" />
                        <label for="Mujer">Mujer</label>
                    </div>
                </div>
            </section>
            <section>
                <label for="correo">Correo</label>
                <input type="email" placeholder="Correo" required />
            </section>
            <section>
                <label for="contraseña">Contraseña</label>
                <input type="password" placeholder="Contraseña" required />
            </section>
            <section>
                <label for="confirmar">Confirmar Contraseña</label>
                <input type="password" placeholder="Confirmar Contraseña" required />
            </section>
            <button className="boton">Enviar</button>
        </form>
    </div>
  )
}