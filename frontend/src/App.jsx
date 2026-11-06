// App.jsx — punto de entrada de la página de Zona 12.
// Aquí se elige qué página se muestra y se dibuja el encabezado compartido.
// En la Fase 3 todavía no hay navegación: se muestra la página de inicio.

import Header from './components/Header'
import PaginaInicio from './components/PaginaInicio'

function App() {
  const vista = 'inicio'

  return (
    <>
      <Header />
      {vista === 'inicio' && <PaginaInicio />}
    </>
  )
}

export default App
