import { Link } from 'react-router-dom'

import Navbar from '@components/Navbar/Navbar'

import "./AdminPage.css"

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className='main_content'>
        <h1>Administrador</h1>
        <h2>Selecciona la entidad que deseas administrar</h2>
        <section className='admin_entities'>
          <Link to={"/courses/admin"} className='admin_entity'>
            <h1>Cursos</h1>
          </Link>
          <Link to={"/users/admin"} className='admin_entity'>
            <h1>Usuarios</h1>
          </Link>
          <Link to={"/recipes/admin"} className='admin_entity'>
            <h1>Recetas</h1>
          </Link>
          <Link to={"/surveys/admin"} className='admin_entity'>
            <h1>Encuestas</h1>
          </Link>
        </section>
      </main>
    </>
  )
}
