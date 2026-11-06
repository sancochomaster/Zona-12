// Botones para cambiar entre las categorías del catálogo (Computadoras / Consolas).

function Filtros({ activa, onCambiar }) {
  return (
    <>
      <h3 className="titulo-filtros">Personaliza tu experiencia</h3>
      <div className="filtros-catalogo">
        <button
          type="button"
          className={`filtro-btn ${activa === 'computadoras' ? 'activo' : ''}`}
          onClick={() => onCambiar('computadoras')}
        >
          Computadoras
        </button>
        <button
          type="button"
          className={`filtro-btn ${activa === 'consolas' ? 'activo' : ''}`}
          onClick={() => onCambiar('consolas')}
        >
          Consolas
        </button>
      </div>
    </>
  )
}

export default Filtros
