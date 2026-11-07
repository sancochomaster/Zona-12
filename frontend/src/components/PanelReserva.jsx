// Panel de resumen de la reserva de una categoría o de los combos.
// El texto, el total y si se puede confirmar llegan calculados por props.

function PanelReserva({ titulo, texto, total, puedeConfirmar, onConfirmar }) {
  return (
    <div className="panel-reserva">
      <h3>{titulo}</h3>
      <p className="texto-reserva">{texto}</p>
      <p className="total-reserva">{total}</p>
      <button type="button" className="btn-confirmar" disabled={!puedeConfirmar} onClick={onConfirmar}>
        Confirmar Reserva
      </button>
    </div>
  )
}

export default PanelReserva
