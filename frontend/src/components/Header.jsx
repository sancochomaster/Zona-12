// Encabezado con el logo y el menú de navegación (igual en las 5 páginas).
// Al hacer clic en un enlace se cambia la vista que se muestra.
// En el celular los enlaces se guardan dentro del botón hamburguesa.

import { useState } from 'react'

function Header({ sesion, onNavegar }) {
  // En el celular el menú arranca cerrado; en el PC el botón ni se ve.
  const [abierto, setAbierto] = useState(false)

  // El enlace de la cuenta muestra el nombre del usuario cuando hay sesión.
  const nombreCorto = sesion ? '👤 ' + sesion.nombre.split(' ')[0] : 'Iniciar sesión'

  const enlaces = [
    { clave: 'inicio', texto: 'Inicio' },
    { clave: 'contacto', texto: 'Contacto' },
    { clave: 'sesion', texto: nombreCorto, clase: 'btn-sesion' },
    { clave: 'administrador', texto: 'Administrador' },
  ]

  // Al elegir un enlace se cierra el menú y se cambia de vista.
  function irA(clave) {
    setAbierto(false)
    onNavegar(clave)
  }

  return (
    <header>
      <img src={import.meta.env.BASE_URL + 'img/logo de la marca.png'} alt="Logo de la marca Zona 12" />

      <button
        type="button"
        className={`btn-menu ${abierto ? 'abierto' : ''}`}
        aria-label={abierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        aria-expanded={abierto}
        aria-controls="menu-principal"
        onClick={() => setAbierto((previo) => !previo)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav id="menu-principal" className={abierto ? 'menu-abierto' : ''}>
        <ul>
          {enlaces.map((enlace) => (
            <li key={enlace.clave}>
              <a
                href={'#' + enlace.clave}
                className={enlace.clase}
                onClick={(evento) => {
                  evento.preventDefault()
                  irA(enlace.clave)
                }}
              >
                {enlace.texto}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
