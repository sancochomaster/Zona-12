// App.jsx — punto de entrada de la página de Zona 12.
// Aquí vive el estado de la vista activa (qué página se muestra) y la sesión
// del usuario. El encabezado y el botón "volver arriba" son compartidos.

import { useEffect, useState } from 'react'
import Header from './components/Header'
import BotonArriba from './components/BotonArriba'
import PaginaInicio from './components/PaginaInicio'
import PaginaContacto from './components/PaginaContacto'
import PaginaSesion from './components/PaginaSesion'
import PaginaAdministrador from './components/PaginaAdministrador'
import PaginaPago from './components/PaginaPago'

// Nombre con el que se guarda la sesión en el navegador.
const CLAVE_SESION = 'sesionZona12'

// Lee la sesión guardada (si la hay) sin romperse si viene vacía o dañada.
function leerSesionGuardada() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SESION))
  } catch {
    return null
  }
}

function App() {
  const [vista, setVista] = useState('inicio')
  const [sesion, setSesion] = useState(leerSesionGuardada)

  // Al cambiar de vista volvemos arriba, como si fuera otra página.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [vista])

  // Guarda el usuario conectado en el navegador y en el estado de la app.
  function iniciarSesion(datos) {
    const nuevaSesion = { nombre: datos.nombre, email: datos.email }
    localStorage.setItem(CLAVE_SESION, JSON.stringify(nuevaSesion))
    setSesion(nuevaSesion)
  }

  function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION)
    setSesion(null)
  }

  return (
    <>
      <Header sesion={sesion} onNavegar={setVista} />

      {vista === 'inicio' && <PaginaInicio sesion={sesion} onNavegar={setVista} />}
      {vista === 'contacto' && <PaginaContacto sesion={sesion} />}
      {vista === 'sesion' && (
        <PaginaSesion sesion={sesion} onIniciarSesion={iniciarSesion} onCerrarSesion={cerrarSesion} />
      )}
      {vista === 'administrador' && <PaginaAdministrador />}
      {vista === 'pago' && <PaginaPago onNavegar={setVista} />}

      <BotonArriba />
    </>
  )
}

export default App
