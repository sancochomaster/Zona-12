// Página de inicio: la sección de presentación + el catálogo.

import ContadorGTA6 from './ContadorGTA6'
import HeroInicio from './HeroInicio'
import TarjetaNoticia from './TarjetaNoticia'
import Catalogo from './Catalogo'

function PaginaInicio({ sesion, onNavegar }) {
  return (
    <>
      <section id="inicio">
        <ContadorGTA6 />
        <HeroInicio onNavegar={onNavegar} />
        <TarjetaNoticia />
      </section>

      <Catalogo sesion={sesion} onNavegar={onNavegar} />
    </>
  )
}

export default PaginaInicio
