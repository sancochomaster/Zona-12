// Tarjeta lateral izquierda con la cuenta atrás para el lanzamiento de GTA 6.

function ContadorGTA6() {
  const tiempo = { dias: '00', horas: '00', min: '00', seg: '00' }

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
