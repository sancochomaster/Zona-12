// Una categoría del catálogo (Computadoras o Consolas): sus grupos de tarjetas
// y su panel de resumen.

import { Fragment } from 'react'
import GridTarjetas from './GridTarjetas'
import PanelReserva from './PanelReserva'

function Categoria({ categoria, oculta }) {
  return (
    <div className={`categoria-catalogo ${oculta ? 'categoria-oculta' : ''}`}>
      <h3>{categoria.titulo}</h3>

      {categoria.grupos.map((grupo) => (
        <Fragment key={grupo.clave}>
          <h3>{grupo.titulo}</h3>
          <GridTarjetas items={grupo.items} esEstacion={grupo.esEstacion} />
        </Fragment>
      ))}

      <PanelReserva titulo="Arma tu Combo" texto="Selecciona lo que quieras para armar tu combo." />
    </div>
  )
}

export default Categoria
