// Pie de página con la marca, enlaces rápidos y la información de licencia.
// Se muestra al final de las 5 vistas, igual que el Header.

// Año actual del copyright. Se calcula una sola vez, fuera del render.
const ANIO = new Date().getFullYear()

function Footer({ onNavegar }) {
  const enlaces = [
    { clave: 'inicio', texto: 'Inicio' },
    { clave: 'contacto', texto: 'Contacto' },
    { clave: 'sesion', texto: 'Mi cuenta' },
    { clave: 'administrador', texto: 'Administrador' },
  ]

  return (
    <footer className="pie-pagina">
      <div className="pie-contenido">
        <div className="pie-columna">
          <h3 className="pie-marca">ZONA 12</h3>
          <p className="pie-lema">// El Núcleo Gamer de Cali</p>
          <p className="pie-descripcion">
            Reserva de estaciones, combos y snacks para la mejor experiencia gamer de la ciudad.
          </p>
        </div>

        <div className="pie-columna">
          <h4>Navegación</h4>
          <ul className="pie-enlaces">
            {enlaces.map((enlace) => (
              <li key={enlace.clave}>
                <a
                  href={'#' + enlace.clave}
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
        </div>

        <div className="pie-columna">
          <h4>Licencia y créditos</h4>
          <p className="pie-licencia">
            © {ANIO} Zona 12 — Todos los derechos reservados.
          </p>
          <p className="pie-licencia">
            Proyecto académico hecho con React, Node.js/Express y MongoDB.
          </p>
          <p className="pie-licencia pie-aviso">
            Las marcas, juegos y consolas mencionadas pertenecen a sus respectivos dueños.
          </p>
        </div>
      </div>

      <div className="pie-inferior">
        <p>Cali, Colombia · Zona 12</p>
        <p>Hecho por gamers para gamers.</p>
      </div>
    </footer>
  )
}

export default Footer
