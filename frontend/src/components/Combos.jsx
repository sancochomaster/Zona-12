// Bloque de combos del catálogo (paquetes con precio especial).

import { grupoCombos } from '../data/catalogo'
import GridTarjetas from './GridTarjetas'
import PanelReserva from './PanelReserva'

function Combos() {
  return (
    <div className="combos-catalogo">
      <h3>Combos</h3>
      <p>Ahorra con nuestros paquetes listos: tiempo de juego + bebidas y snacks a mejor precio.</p>
      <GridTarjetas items={grupoCombos.items} />
      <PanelReserva titulo="Tu Combo" texto="Selecciona un combo para reservarlo." />
    </div>
  )
}

export default Combos
