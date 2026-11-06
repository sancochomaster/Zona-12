// Página de contacto: formulario que envía un mensaje al backend.

function PaginaContacto() {
  return (
    <section id="contacto">
      <h2>Contacto</h2>
      <p>Para contactarte con nosotros, puedes enviarnos un mensaje a través del siguiente formulario:</p>

      <form id="form-contacto">
        <label htmlFor="nombre">Nombre:</label><br />
        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required /><br /><br />

        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" placeholder="tu@correo.com" required /><br /><br />

        <label htmlFor="mensaje">Mensaje:</label><br />
        <textarea id="mensaje" name="mensaje" rows="4" placeholder="¿Qué deseas consultar o reservar?" required></textarea><br /><br />

        <button type="submit">Enviar mensaje</button>
      </form>
    </section>
  )
}

export default PaginaContacto
