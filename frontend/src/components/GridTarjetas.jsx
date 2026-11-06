// Rejilla de tarjetas. Recorre la lista con .map() y dibuja una Tarjeta por ítem.

import Tarjeta from './Tarjeta'

function GridTarjetas({ items, esEstacion }) {
  return (
    <div className={`grid-tarjetas ${esEstacion ? 'grid-estaciones' : ''}`}>
      {items.map((item) => (
        <Tarjeta key={item.id} item={item} esEstacion={esEstacion} />
      ))}
    </div>
  )
}

export default GridTarjetas
