// Tarjeta lateral izquierda con la cuenta atrás para el lanzamiento de GTA 6.
// El tiempo se recalcula cada segundo con un intervalo (setInterval).

import { useEffect, useState } from 'react'
import { fechaGTA6 } from '../data/catalogo'
import { dosDigitos } from '../utils/formato'

// Calcula cuánto falta para el lanzamiento de GTA 6.
function calcularTiempo() {
  const restante = new Date(fechaGTA6) - new Date()

  if (restante <= 0) {
    return { dias: '00', horas: '00', min: '00', seg: '00' }
  }

  return {
    dias: dosDigitos(Math.floor(restante / (1000 * 60 * 60 * 24))),
    horas: dosDigitos(Math.floor(restante / (1000 * 60 * 60)) % 24),
    min: dosDigitos(Math.floor(restante / (1000 * 60)) % 60),
    seg: dosDigitos(Math.floor(restante / 1000) % 60),
  }
}

function ContadorGTA6() {
  const [tiempo, setTiempo] = useState(calcularTiempo)

  useEffect(() => {
    const intervalo = setInterval(() => setTiempo(calcularTiempo()), 1000)
    return () => clearInterval(intervalo)
  }, [])

  return (
    <article className="tarjeta-lateral tarjeta-gta">
      <img src="/img/elgta.png" alt="GTA 6" />
      <div className="tarjeta-texto">
        <h3>GTA 6</h3>
        <p>Cuenta atrás para el lanzamiento</p>
        <div className="contador">
          <div className="contador-item"><span>{tiempo.dias}</span><small>Días</small></div>
          <div className="contador-item"><span>{tiempo.horas}</span><small>Horas</small></div>
          <div className="contador-item"><span>{tiempo.min}</span><small>Min</small></div>
          <div className="contador-item"><span>{tiempo.seg}</span><small>Seg</small></div>
        </div>
      </div>
    </article>
  )
}

export default ContadorGTA6
