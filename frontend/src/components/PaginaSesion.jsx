// Página de cuenta: formularios de registro / login y vista con la sesión iniciada.
// Todo el formulario es controlado con useState; el registro y el login se validan
// contra la base de datos mediante la API.

import { useEffect, useState } from 'react'
import { formatearPrecio } from '../utils/formato'

// Dirección del servidor backend (Express).
const API = 'http://localhost:4000'

function PaginaSesion({ sesion, onIniciarSesion, onCerrarSesion }) {
  // Qué formulario se muestra cuando NO hay sesión.
  const [modo, setModo] = useState('login')
  const [mensaje, setMensaje] = useState('')
  const [esError, setEsError] = useState(false)

  // Campos del login.
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Campos del registro.
  const [regNombre, setRegNombre] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirmar, setRegConfirmar] = useState('')

  // Compras del usuario con sesión iniciada.
  const [compras, setCompras] = useState([])

  // Cuando hay sesión, se cargan las compras pagadas de ese correo.
  useEffect(() => {
    if (!sesion) return

    let activo = true
    fetch(API + '/api/reservas?email=' + encodeURIComponent(sesion.email))
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        if (activo) setCompras(Array.isArray(datos) ? datos : [])
      })
      .catch(() => {
        if (activo) setCompras([])
      })

    return () => {
      activo = false
    }
  }, [sesion])

  function avisar(texto, error) {
    setMensaje(texto)
    setEsError(Boolean(error))
  }

  function mostrarFormulario(cual) {
    setModo(cual)
    avisar('', false)
  }

  async function registrar(evento) {
    evento.preventDefault()

    const nombre = regNombre.trim()
    const email = regEmail.trim().toLowerCase()

    if (regPassword.length < 6) return avisar('La contraseña debe tener al menos 6 caracteres.', true)
    if (regPassword !== regConfirmar) return avisar('Las contraseñas no coinciden.', true)

    try {
      const respuesta = await fetch(API + '/api/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password: regPassword }),
      })
      const datos = await respuesta.json()

      if (!respuesta.ok) return avisar(datos.error || 'No se pudo crear la cuenta.', true)

      onIniciarSesion(datos)
      setRegNombre('')
      setRegEmail('')
      setRegPassword('')
      setRegConfirmar('')
      avisar('¡Cuenta creada! Ya iniciaste sesión.', false)
    } catch {
      avisar('No se pudo conectar con el servidor.', true)
    }
  }

  async function ingresar(evento) {
    evento.preventDefault()

    const email = loginEmail.trim().toLowerCase()

    try {
      const respuesta = await fetch(API + '/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: loginPassword }),
      })
      const datos = await respuesta.json()

      if (!respuesta.ok) return avisar(datos.error || 'Correo o contraseña incorrectos.', true)

      onIniciarSesion(datos)
      setLoginEmail('')
      setLoginPassword('')
      avisar('', false)
    } catch {
      avisar('No se pudo conectar con el servidor.', true)
    }
  }

  function cerrar() {
    onCerrarSesion()
    setModo('login')
    avisar('Sesión cerrada.', false)
  }

  // Texto bajo el título "Mi Cuenta" según lo que se esté mostrando.
  const intro = sesion
    ? 'Ya iniciaste sesión en Zona 12. Desde aquí puedes cerrarla cuando quieras.'
    : modo === 'registro'
      ? 'Crea tu cuenta con tus datos para empezar a reservar en Zona 12.'
      : 'Ingresa con tu correo y contraseña para reservar y consultar con nosotros.'

  return (
    <section id="sesion">
      <h2>Mi Cuenta</h2>
      <p id="sesion-intro" className="intro-sesion">{intro}</p>

      {!sesion && (
        <div id="sesion-formularios">
          {modo === 'login' ? (
            <form id="form-usuario-login" onSubmit={ingresar}>
              <h3>Iniciar sesión</h3>
              <label htmlFor="ul-email">Email:</label><br />
              <input
                type="email"
                id="ul-email"
                placeholder="tu@correo.com"
                required
                value={loginEmail}
                onChange={(evento) => setLoginEmail(evento.target.value)}
              /><br /><br />

              <label htmlFor="ul-password">Contraseña:</label><br />
              <input
                type="password"
                id="ul-password"
                placeholder="********"
                required
                value={loginPassword}
                onChange={(evento) => setLoginPassword(evento.target.value)}
              /><br /><br />

              <button type="submit">Ingresar</button>
              <p className="cambio-sesion">
                ¿No tienes cuenta?{' '}
                <a
                  href="#sesion"
                  id="ir-registro"
                  onClick={(evento) => {
                    evento.preventDefault()
                    mostrarFormulario('registro')
                  }}
                >
                  Regístrate
                </a>
              </p>
            </form>
          ) : (
            <form id="form-usuario-registro" onSubmit={registrar}>
              <h3>Crear cuenta</h3>
              <label htmlFor="ur-nombre">Nombre:</label><br />
              <input
                type="text"
                id="ur-nombre"
                placeholder="Tu nombre"
                required
                value={regNombre}
                onChange={(evento) => setRegNombre(evento.target.value)}
              /><br /><br />

              <label htmlFor="ur-email">Email:</label><br />
              <input
                type="email"
                id="ur-email"
                placeholder="tu@correo.com"
                required
                value={regEmail}
                onChange={(evento) => setRegEmail(evento.target.value)}
              /><br /><br />

              <label htmlFor="ur-password">Contraseña (mínimo 6 caracteres):</label><br />
              <input
                type="password"
                id="ur-password"
                placeholder="********"
                minLength="6"
                required
                value={regPassword}
                onChange={(evento) => setRegPassword(evento.target.value)}
              /><br /><br />

              <label htmlFor="ur-confirmar">Confirmar contraseña:</label><br />
              <input
                type="password"
                id="ur-confirmar"
                placeholder="********"
                minLength="6"
                required
                value={regConfirmar}
                onChange={(evento) => setRegConfirmar(evento.target.value)}
              /><br /><br />

              <button type="submit">Registrarme</button>
              <p className="cambio-sesion">
                ¿Ya tienes cuenta?{' '}
                <a
                  href="#sesion"
                  id="ir-login"
                  onClick={(evento) => {
                    evento.preventDefault()
                    mostrarFormulario('login')
                  }}
                >
                  Inicia sesión
                </a>
              </p>
            </form>
          )}
        </div>
      )}

      {sesion && (
        <div id="sesion-activa">
          <h3 id="sesion-saludo">¡Hola, {sesion.nombre}!</h3>
          <p id="sesion-correo">{sesion.email}</p>
          <button type="button" id="btn-cerrar-sesion" onClick={cerrar}>Cerrar sesión</button>

          <div id="historial-compras">
            <h3>Mis compras</h3>
            <div id="lista-compras">
              {compras.length === 0 ? (
                <p className="compra-vacia">Aún no has realizado compras. ¡Anímate a reservar en el catálogo!</p>
              ) : (
                compras.map((compra, indice) => {
                  const total = compra.items.reduce((suma, item) => suma + (item.precio || 0), 0)

                  return (
                    <article className="compra-tarjeta" key={compra._id}>
                      <header className="compra-cabecera">
                        <span className="compra-numero">Compra #{indice + 1}</span>
                        <span className="compra-categoria">{compra.categoria}</span>
                      </header>

                      <ul className="compra-items">
                        {compra.items.map((item) => (
                          <li key={item.tipo + '-' + item.nombre}>
                            <span>{item.nombre}</span>
                            <span className="compra-item-detalle">
                              {item.tipo}
                              {item.precio ? ` · ${formatearPrecio(item.precio)} ${item.sufijo}` : ''}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <footer className="compra-pie">
                        <span>{compra.fecha}</span>
                        <strong>{formatearPrecio(total)}</strong>
                      </footer>
                    </article>
                  )
                })
              )}
            </div>
          </div>
        </div>
      )}

      <p id="sesion-mensaje" role="status" style={{ color: esError ? '#ff2a8d' : '#05d9e8' }}>
        {mensaje}
      </p>
    </section>
  )
}

export default PaginaSesion
