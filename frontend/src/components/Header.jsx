// Encabezado con el logo y el menú de navegación (igual en las 5 páginas).
// Al hacer clic en un enlace se cambia la vista que se muestra.

function Header({ sesion, onNavegar }) {
  // El enlace de la cuenta muestra el nombre del usuario cuando hay sesión.
  const nombreCorto = sesion ? '👤 ' + sesion.nombre.split(' ')[0] : 'Iniciar sesión'

  const enlaces = [
    { clave: 'inicio', texto: 'Inicio' },
    { clave: 'contacto', texto: 'Contacto' },
    { clave: 'sesion', texto: nombreCorto, clase: 'btn-sesion' },
    { clave: 'administrador', texto: 'Administrador' },
  ]

  return (
    <header>
      <img src="/img/logo de la marca.png" alt="Logo de la marca Zona 12" />
      <nav>
        <ul>
          {enlaces.map((enlace) => (
            <li key={enlace.clave}>
              <a
                href={'#' + enlace.clave}
                className={enlace.clase}
                onClick={(evento) => {
                  evento.preventDefault()
                  onNavegar(enlace.clave)
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
