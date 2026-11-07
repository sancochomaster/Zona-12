// Una tarjeta del catálogo. Sirve para dos diseños:
//  - Estaciones de PC/consola (con el dibujo del monitor).
//  - Servicios, bebidas, snacks y combos (tarjeta normal).

import { formatearPrecio } from '../utils/formato'

function ListaSpecs({ specs }) {
  if (!specs) return null
  return (
    <ul className="specs-pc">
      {specs.map((spec) => (
        <li key={spec.etiqueta}><strong>{spec.etiqueta}:</strong> {spec.valor}</li>
      ))}
    </ul>
  )
}

function Tarjeta({ item, esEstacion, seleccionado, desplegada, onSeleccionar, onAlternarDesplegar }) {
  const disponible = !item.estado || item.estado === 'Disponible'
  const precio = item.precio ? (
    <p className="precio-estacion">
      <strong>{formatearPrecio(item.precio)}{item.sufijo ? ' ' + item.sufijo : ''}</strong>
    </p>
  ) : null

  if (esEstacion) {
    // En las estaciones, hacer clic en la tarjeta la despliega.
    // El botón de seleccionar no despliega (corta la propagación del clic).
    return (
      <div
        className={`estacion-gamer ${disponible ? 'disponible' : 'ocupada'} tarjeta-seleccion ${seleccionado ? 'seleccionada' : ''} ${desplegada ? 'desplegada' : ''}`}
        onClick={onAlternarDesplegar}
      >
        <div className="monitor-icon">
          <div className="pantalla">
            <span className="num-pc">{item.titulo.split('#')[1] || ''}</span>
          </div>
          <div className="base-monitor"></div>
        </div>
        <div className="info-desplegable">
          <h4>{item.titulo}</h4>
          <ListaSpecs specs={item.specs} />
          {item.detalle ? <p>{item.detalle}</p> : null}
          {precio}
          <button
            type="button"
            className="btn-seleccion"
            disabled={!disponible}
            onClick={(evento) => {
              evento.stopPropagation()
              onSeleccionar()
            }}
          >
            {disponible ? (seleccionado ? 'Quitar' : 'Seleccionar') : 'No disponible'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <article
      className={`tarjeta-seleccion ${disponible ? '' : 'ocupada'} ${seleccionado ? 'seleccionada' : ''}`}
      onClick={onSeleccionar}
    >
      {item.estado ? (
        <span className={`estado ${disponible ? 'estado-disponible' : 'estado-ocupada'}`}>{item.estado}</span>
      ) : null}
      <h4>{item.titulo}</h4>
      <ListaSpecs specs={item.specs} />
      {item.detalle ? <p>{item.detalle}</p> : null}
      {precio}
      <button type="button" className="btn-seleccion" disabled={!disponible}>
        {disponible ? (seleccionado ? 'Quitar' : 'Seleccionar') : 'No disponible'}
      </button>
    </article>
  )
}

export default Tarjeta
