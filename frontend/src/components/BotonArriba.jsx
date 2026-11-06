// Botón flotante "volver arriba". Aparece cuando el usuario baja la página.

import { useEffect, useState } from 'react'

function BotonArriba() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function alHacerScroll() {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', alHacerScroll)
    alHacerScroll()
    return () => window.removeEventListener('scroll', alHacerScroll)
  }, [])

  return (
    <button
      type="button"
      id="btn-arriba"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        padding: '12px 16px',
        background: 'linear-gradient(90deg, #ff2a8d, #05d9e8)',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        fontSize: '1.2rem',
        cursor: 'pointer',
        display: visible ? 'block' : 'none',
        boxShadow: '0 0 15px rgba(255, 42, 141, 0.6)',
        zIndex: 1000,
        transition: 'transform 0.3s ease',
      }}
    >
      ▲
    </button>
  )
}

export default BotonArriba
