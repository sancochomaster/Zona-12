// Rejilla de tarjetas. Recorre la lista con .map() y dibuja una Tarjeta por ítem.

import Tarjeta from './Tarjeta'

function GridTarjetas({
  items,
  esEstacion,
  seleccionadosIds = [],
  idDesplegada,
  onSeleccionar,
  onDesplegar = () => {},
}) {
  return (
    <div className={`grid-tarjetas ${esEstacion ? 'grid-estaciones' : ''}`}>
      {items.map((item) => (
        <Tarjeta
          key={item.id}
          item={item}
          esEstacion={esEstacion}
          seleccionado={seleccionadosIds.includes(item.id)}
          desplegada={idDesplegada === item.id}
          onSeleccionar={() => onSeleccionar(item)}
          onAlternarDesplegar={() => onDesplegar(item.id)}
        />
      ))}
    </div>
  )
}

export default GridTarjetas
