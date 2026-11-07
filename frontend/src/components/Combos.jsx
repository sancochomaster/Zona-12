// Bloque de combos del catálogo (paquetes con precio especial).

import { grupoCombos } from '../data/catalogo'
import GridTarjetas from './GridTarjetas'
import PanelReserva from './PanelReserva'

function Combos({ seleccionadosIds, idDesplegada, onSeleccionar, onDesplegar, panel, onConfirmar }) {
  return (
    <div className="combos-catalogo">
      <h3>Combos</h3>
      <p>Ahorra con nuestros paquetes listos: tiempo de juego + bebidas y snacks a mejor precio.</p>

      <GridTarjetas
        items={grupoCombos.items}
        seleccionadosIds={seleccionadosIds}
        idDesplegada={idDesplegada}
        onSeleccionar={onSeleccionar}
        onDesplegar={onDesplegar}
      />

      <PanelReserva
        titulo="Tu Combo"
        texto={panel.texto}
        total={panel.total}
        puedeConfirmar={panel.puedeConfirmar}
        onConfirmar={onConfirmar}
      />
    </div>
  )
}

export default Combos
