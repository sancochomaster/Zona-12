// Encabezado con el logo y el menú de navegación (igual en las 5 páginas).

function Header() {
  return (
    <header>
      <img src="/img/logo de la marca.png" alt="Logo de la marca Zona 12" />
      <nav>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#contacto">Contacto</a></li>
          <li><a href="#sesion" className="btn-sesion">Iniciar sesión</a></li>
          <li><a href="#administrador">Administrador</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
