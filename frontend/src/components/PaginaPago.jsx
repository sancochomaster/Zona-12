// Página de pago: resumen de la compra pendiente + formulario de tarjeta.

function PaginaPago() {
  return (
    <section id="pago">
      <h2>Pago de tu Compra</h2>
      <p>Completa el pago para confirmar tu registro. Solo las compras pagadas llegan al panel del administrador.</p>

      {/* RESUMEN DE LA COMPRA PENDIENTE (SE PINTA DINÁMICAMENTE) */}
      <div id="pago-resumen"></div>

      {/* FORMULARIO DE PAGO */}
      <form id="form-pago">
        <label htmlFor="titular">Titular de la tarjeta:</label><br />
        <input type="text" id="titular" name="titular" placeholder="Nombre como aparece en la tarjeta" required /><br /><br />

        <label htmlFor="tarjeta">Número de tarjeta:</label><br />
        <input type="text" id="tarjeta" name="tarjeta" placeholder="0000 0000 0000 0000" maxLength="19" required /><br /><br />

        <div className="pago-fila">
          <div>
            <label htmlFor="vencimiento">Vencimiento:</label><br />
            <input type="text" id="vencimiento" name="vencimiento" placeholder="MM/AA" maxLength="5" required />
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label><br />
            <input type="text" id="cvv" name="cvv" placeholder="123" maxLength="4" required />
          </div>
        </div>

        <button type="submit">Pagar y confirmar</button>
        <button type="button" id="btn-cancelar-pago" className="btn-cancelar-pago">Cancelar pago</button>
      </form>

      {/* MENSAJE DE PAGO COMPLETADO (SE MUESTRA DINÁMICAMENTE) */}
      <div id="pago-mensaje"></div>
    </section>
  )
}

export default PaginaPago
