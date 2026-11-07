// Una categoría del catálogo (Computadoras o Consolas): sus grupos de tarjetas
// y su panel de resumen.

import { Fragment, useEffect, useRef, useState } from 'react'
import GridTarjetas from './GridTarjetas'
import PanelReserva from './PanelReserva'

function Categoria({
  categoria,
  oculta,
  seleccion,
  desplegadas,
  onSeleccionar,
  onDesplegar,
  panel,
  onConfirmar,
}) {
  const [animando, setAnimando] = useState(false)
  const primeraVez = useRef(true)

  // Cuando la categoría vuelve a mostrarse, se le da la animación de entrada.
  useEffect(() => {
    if (primeraVez.current) {
      primeraVez.current = false
      return
    }
    if (oculta) return

    setAnimando(true)
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimando(false))
    })
    return () => cancelAnimationFrame(id)
  }, [oculta])

  return (
    <div className={`categoria-catalogo ${oculta ? 'categoria-oculta' : ''} ${animando ? 'categoria-entrando' : ''}`}>
      <h3>{categoria.titulo}</h3>

      {categoria.grupos.map((grupo) => (
        <Fragment key={grupo.clave}>
          <h3>{grupo.titulo}</h3>
          <GridTarjetas
            items={grupo.items}
            esEstacion={grupo.esEstacion}
            seleccionadosIds={(seleccion[grupo.clave] || []).map((item) => item.id)}
            idDesplegada={desplegadas[grupo.clave]}
            onSeleccionar={(item) => onSeleccionar(grupo, item)}
            onDesplegar={(id) => onDesplegar(grupo.clave, id)}
          />
        </Fragment>
      ))}

      <PanelReserva
        titulo="Arma tu Combo"
        texto={panel.texto}
        total={panel.total}
        puedeConfirmar={panel.puedeConfirmar}
        onConfirmar={onConfirmar}
      />
    </div>
  )
}

export default Categoria
