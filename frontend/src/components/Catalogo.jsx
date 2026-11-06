// Sección del catálogo: aviso de inicio de sesión, combos, filtros y categorías.

import { categorias } from '../data/catalogo'
import Combos from './Combos'
import Filtros from './Filtros'
import Categoria from './Categoria'

function Catalogo() {
  const categoriaActiva = 'computadoras'

  return (
    <section id="catalogo">
      <h2>Catálogo de Servicios</h2>
      <p>En nuestro catálogo encontrarás todos los servicios y equipos que tenemos disponibles en Zona 12.</p>

      <div className="aviso-catalogo">
        <p>🔒 Debes iniciar sesión para elegir equipos, combos y reservar en Zona 12.</p>
        <a href="#sesion">Iniciar sesión</a>
      </div>

      <Combos />

      <Filtros activa={categoriaActiva} />

      {categorias.map((categoria) => (
        <Categoria
          key={categoria.clave}
          categoria={categoria}
          oculta={categoria.clave !== categoriaActiva}
        />
      ))}
    </section>
  )
}

export default Catalogo
