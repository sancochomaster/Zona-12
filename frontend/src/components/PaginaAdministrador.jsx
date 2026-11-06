// Página del administrador: login y panel con pestañas (mensajes / compras).
// El acceso es fijo (admin / 1234), como en la versión original.

import { useEffect, useState } from 'react'
import { formatearPrecio } from '../utils/formato'

// Dirección del servidor backend (Express).
const API = 'http://localhost:4000'

function PaginaAdministrador() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [conectado, setConectado] = useState(false)
  const [tab, setTab] = useState('panel-mensajes')

  const [mensajes, setMensajes] = useState([])
  const [reservas, setReservas] = useState([])

  // Al entrar al panel se cargan los mensajes y las compras desde la base de datos.
  useEffect(() => {
    if (!conectado) return

    let activo = true

    fetch(API + '/api/mensajes')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        if (activo) setMensajes(Array.isArray(datos) ? datos : [])
      })
      .catch(() => {
        if (activo) setMensajes([])
      })

    fetch(API + '/api/reservas')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        if (activo) setReservas(Array.isArray(datos) ? datos : [])
      })
      .catch(() => {
        if (activo) setReservas([])
      })

    return () => {
      activo = false
    }
  }, [conectado])

  function ingresar(evento) {
    evento.preventDefault()

    // Credenciales de prueba.
    if (usuario === 'admin' && password === '1234') {
      window.alert('¡Acceso concedido! Bienvenido al panel de administración.')
      setConectado(true)
    } else {
      window.alert('Usuario o contraseña incorrectos.')
    }
  }

  return (
    <section id="administrador">
      <h2>Acceso Administrador</h2>

      {!conectado && (
        <form id="form-login" onSubmit={ingresar}>
          <label htmlFor="usuario">Usuario:</label><br />
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Usuario admin"
            required
            value={usuario}
            onChange={(evento) => setUsuario(evento.target.value)}
          /><br /><br />

          <label htmlFor="password">Contraseña:</label><br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            required
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
          /><br /><br />

          <button type="submit">Ingresar</button>
        </form>
      )}

      {conectado && (
        <div id="mensajes-admin">
          <div className="admin-encabezado">
            <h3>Panel de Administración</h3>
            <p>Consulta por separado los mensajes de contacto y las compras de los clientes.</p>
          </div>

          {/* PESTAÑAS PARA SEPARAR MENSAJES Y COMPRAS */}
          <div className="admin-tabs">
            <button
              type="button"
              className={`admin-tab ${tab === 'panel-mensajes' ? 'activo' : ''}`}
              onClick={() => setTab('panel-mensajes')}
            >
              Mensajes de Contacto <span className="admin-contador">{mensajes.length}</span>
            </button>
            <button
              type="button"
              className={`admin-tab ${tab === 'panel-compras' ? 'activo' : ''}`}
              onClick={() => setTab('panel-compras')}
            >
              Compras de Clientes <span className="admin-contador">{reservas.length}</span>
            </button>
          </div>

          {/* PANEL: MENSAJES DE CONTACTO */}
          <div id="panel-mensajes" className={`admin-panel ${tab === 'panel-mensajes' ? 'activo' : ''}`}>
            <div id="lista-mensajes">
              {mensajes.length === 0 ? (
                <p className="admin-vacio">No hay mensajes de contacto registrados todavía.</p>
              ) : (
                mensajes.map((mensaje, indice) => (
                  <div className="admin-tarjeta" key={mensaje._id}>
                    <p className="admin-tarjeta-titulo">Mensaje #{indice + 1}</p>
                    <p className="admin-dato"><strong>De:</strong> {mensaje.nombre} ({mensaje.email})</p>
                    <p className="admin-mensaje-texto">{mensaje.mensaje}</p>
                    <small className="admin-fecha">Recibido el: {mensaje.fecha}</small>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* PANEL: COMPRAS DE CLIENTES */}
          <div id="panel-compras" className={`admin-panel ${tab === 'panel-compras' ? 'activo' : ''}`}>
            <div id="lista-reservas">
              {reservas.length === 0 ? (
                <p className="admin-vacio">No hay compras pagadas registradas todavía.</p>
              ) : (
                reservas.map((reserva, indice) => {
                  const total = reserva.items.reduce((suma, item) => suma + (item.precio || 0), 0)

                  return (
                    <div className="admin-tarjeta compra" key={reserva._id}>
                      <p className="admin-tarjeta-titulo">Compra #{indice + 1} — {reserva.categoria}</p>
                      <p className="admin-dato"><strong>Cliente:</strong> {reserva.usuario || 'Invitado'}</p>
                      <div className="admin-items">
                        {reserva.items.map((item) => (
                          <p className="admin-item" key={item.tipo + '-' + item.nombre}>
                            <strong>{item.tipo}:</strong> {item.nombre}
                            {item.precio ? ` — ${formatearPrecio(item.precio)} ${item.sufijo}` : ''}
                          </p>
                        ))}
                      </div>
                      <p className="admin-total">Total: {formatearPrecio(total)}</p>
                      <small className="admin-fecha">Fecha: {reserva.fecha}</small>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default PaginaAdministrador
