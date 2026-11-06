// Página de contacto: formulario que envía un mensaje al backend.
// Los campos son controlados con useState y el envío se hace con fetch.

import { useState } from 'react'

// Dirección del servidor backend (Express).
const API = 'http://localhost:4000'

function PaginaContacto({ sesion }) {
  const [nombre, setNombre] = useState(sesion ? sesion.nombre : '')
  const [email, setEmail] = useState(sesion ? sesion.email : '')
  const [mensaje, setMensaje] = useState('')

  async function enviar(evento) {
    evento.preventDefault()

    try {
      const respuesta = await fetch(API + '/api/mensajes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, mensaje }),
      })
      if (!respuesta.ok) throw new Error('No se pudo guardar')

      window.alert(`¡Gracias, ${nombre}! Tu mensaje fue enviado y registrado en el sistema.`)
      setNombre('')
      setEmail('')
      setMensaje('')
    } catch {
      window.alert('No se pudo enviar el mensaje. Revisa tu conexión e inténtalo de nuevo.')
    }
  }

  return (
    <section id="contacto">
      <h2>Contacto</h2>
      <p>Para contactarte con nosotros, puedes enviarnos un mensaje a través del siguiente formulario:</p>

      <form id="form-contacto" onSubmit={enviar}>
        <label htmlFor="nombre">Nombre:</label><br />
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Tu nombre"
          required
          value={nombre}
          onChange={(evento) => setNombre(evento.target.value)}
        /><br /><br />

        <label htmlFor="email">Email:</label><br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="tu@correo.com"
          required
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
        /><br /><br />

        <label htmlFor="mensaje">Mensaje:</label><br />
        <textarea
          id="mensaje"
          name="mensaje"
          rows="4"
          placeholder="¿Qué deseas consultar o reservar?"
          required
          value={mensaje}
          onChange={(evento) => setMensaje(evento.target.value)}
        ></textarea><br /><br />

        <button type="submit">Enviar mensaje</button>
      </form>
    </section>
  )
}

export default PaginaContacto
