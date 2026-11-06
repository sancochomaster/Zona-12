// Página del administrador: login y panel con pestañas (mensajes / compras).

function PaginaAdministrador() {
  return (
    <section id="administrador">
      <h2>Acceso Administrador</h2>
      <form id="form-login">
        <label htmlFor="usuario">Usuario:</label><br />
        <input type="text" id="usuario" name="usuario" placeholder="Usuario admin" required /><br /><br />

        <label htmlFor="password">Contraseña:</label><br />
        <input type="password" id="password" name="password" placeholder="********" required /><br /><br />

        <button type="submit">Ingresar</button>
      </form>

      {/* PANEL DE ADMIN (SE MUESTRA DESPUÉS DE INICIAR SESIÓN) */}
      <div id="mensajes-admin" style={{ display: 'none' }}>
        <div className="admin-encabezado">
          <h3>Panel de Administración</h3>
          <p>Consulta por separado los mensajes de contacto y las compras de los clientes.</p>
        </div>

        {/* PESTAÑAS PARA SEPARAR MENSAJES Y COMPRAS */}
        <div className="admin-tabs">
          <button type="button" className="admin-tab activo">
            Mensajes de Contacto <span className="admin-contador">0</span>
          </button>
          <button type="button" className="admin-tab">
            Compras de Clientes <span className="admin-contador">0</span>
          </button>
        </div>

        {/* PANEL: MENSAJES DE CONTACTO */}
        <div id="panel-mensajes" className="admin-panel activo">
          <div id="lista-mensajes"></div>
        </div>

        {/* PANEL: COMPRAS DE CLIENTES */}
        <div id="panel-compras" className="admin-panel">
          <div id="lista-reservas"></div>
        </div>
      </div>
    </section>
  )
}

export default PaginaAdministrador
