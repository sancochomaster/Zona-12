// Página de pago: resumen de la compra pendiente + formulario de tarjeta.
// La compra pendiente llega guardada por el catálogo en localStorage.

import { useState } from 'react'
import { formatearPrecio } from '../utils/formato'

// Dirección del servidor backend (Express).
const API = 'http://localhost:4000'

// Lee la compra pendiente guardada por el catálogo.
function leerCompraPendiente() {
  try {
    return JSON.parse(localStorage.getItem('pagoPendienteZona12'))
  } catch {
    return null
  }
}

function PaginaPago({ onNavegar }) {
  const [compra, setCompra] = useState(leerCompraPendiente)
  const [pagado, setPagado] = useState(false)

  // Campos del formulario de pago.
  const [titular, setTitular] = useState('')
  const [tarjeta, setTarjeta] = useState('')
  const [vencimiento, setVencimiento] = useState('')
  const [cvv, setCvv] = useState('')

  async function pagar(evento) {
    evento.preventDefault()

    // Registramos la compra pagada en la base de datos: esta es la que ve el administrador.
    try {
      const respuesta = await fetch(API + '/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(compra),
      })
      if (!respuesta.ok) throw new Error('No se pudo registrar la compra')
    } catch {
      window.alert('No se pudo completar el pago. Revisa tu conexión e inténtalo de nuevo.')
      return
    }

    localStorage.removeItem('pagoPendienteZona12')
    setCompra(null)
    setPagado(true)
  }

  function cancelar() {
    localStorage.removeItem('pagoPendienteZona12')
    window.alert('Pago cancelado. Tu registro no fue enviado al administrador.')
    onNavegar('inicio')
  }

  return (
    <section id="pago">
      <h2>Pago de tu Compra</h2>
      <p>Completa el pago para confirmar tu registro. Solo las compras pagadas llegan al panel del administrador.</p>

      {!compra && !pagado && (
        <div id="pago-resumen">
          <p className="pago-vacio">
            No tienes ninguna compra pendiente de pago.{' '}
            <a
              href="#catalogo"
              onClick={(evento) => {
                evento.preventDefault()
                onNavegar('inicio')
              }}
            >
              Volver al catálogo
            </a>
            .
          </p>
        </div>
      )}

      {compra && !pagado && (
        <>
          <div id="pago-resumen">
            <h3>Resumen de tu compra</h3>
            <p className="pago-dato"><strong>Cliente:</strong> {compra.usuario || 'Invitado'}</p>
            <p className="pago-dato"><strong>Categoría:</strong> {compra.categoria}</p>
            {compra.items.map((item) => (
              <p className="pago-item" key={item.tipo + '-' + item.nombre}>
                <strong>{item.tipo}:</strong> {item.nombre}
                {item.precio ? ` — ${formatearPrecio(item.precio)} ${item.sufijo}` : ''}
              </p>
            ))}
            <p className="pago-total">
              Total a pagar: {formatearPrecio(compra.items.reduce((suma, item) => suma + (item.precio || 0), 0))}
            </p>
          </div>

          <form id="form-pago" onSubmit={pagar}>
            <label htmlFor="titular">Titular de la tarjeta:</label><br />
            <input
              type="text"
              id="titular"
              name="titular"
              placeholder="Nombre como aparece en la tarjeta"
              required
              value={titular}
              onChange={(evento) => setTitular(evento.target.value)}
            /><br /><br />

            <label htmlFor="tarjeta">Número de tarjeta:</label><br />
            <input
              type="text"
              id="tarjeta"
              name="tarjeta"
              placeholder="0000 0000 0000 0000"
              maxLength="19"
              required
              value={tarjeta}
              onChange={(evento) => setTarjeta(evento.target.value)}
            /><br /><br />

            <div className="pago-fila">
              <div>
                <label htmlFor="vencimiento">Vencimiento:</label><br />
                <input
                  type="text"
                  id="vencimiento"
                  name="vencimiento"
                  placeholder="MM/AA"
                  maxLength="5"
                  required
                  value={vencimiento}
                  onChange={(evento) => setVencimiento(evento.target.value)}
                />
              </div>
              <div>
                <label htmlFor="cvv">CVV:</label><br />
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  maxLength="4"
                  required
                  value={cvv}
                  onChange={(evento) => setCvv(evento.target.value)}
                />
              </div>
            </div>

            <button type="submit">Pagar y confirmar</button>
            <button type="button" id="btn-cancelar-pago" className="btn-cancelar-pago" onClick={cancelar}>
              Cancelar pago
            </button>
          </form>
        </>
      )}

      {pagado && (
        <div id="pago-mensaje" className="visible">
          <p className="pago-exito">✅ ¡Pago realizado con éxito!</p>
          <p>Tu compra quedó registrada, nos vemos en Zona 12.</p>
          <a
            className="pago-volver"
            href="#inicio"
            onClick={(evento) => {
              evento.preventDefault()
              onNavegar('inicio')
            }}
          >
            Volver al inicio
          </a>
        </div>
      )}
    </section>
  )
}

export default PaginaPago
