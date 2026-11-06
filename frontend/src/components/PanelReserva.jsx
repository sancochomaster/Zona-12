// Panel de resumen de la reserva de una categoría o de los combos.

function PanelReserva({ titulo, texto }) {
  return (
    <div className="panel-reserva">
      <h3>{titulo}</h3>
      <p className="texto-reserva">{texto}</p>
      <p className="total-reserva"></p>
      <button type="button" className="btn-confirmar" disabled>Confirmar Reserva</button>
    </div>
  )
}

export default PanelReserva
