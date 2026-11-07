// Sección del catálogo: aviso de inicio de sesión, combos, filtros y categorías.
// Aquí vive el estado de la interacción: la categoría activa, la selección
// (el "carrito") y qué estación está desplegada. Los hijos solo avisan con
// callbacks y reciben los datos ya calculados por props.

import { useState } from 'react'
import { categorias, grupoCombos } from '../data/catalogo'
import { formatearPrecio } from '../utils/formato'
import Combos from './Combos'
import Filtros from './Filtros'
import Categoria from './Categoria'

function Catalogo({ sesion, onNavegar }) {
  const [categoriaActiva, setCategoriaActiva] = useState('computadoras')
  // seleccion guarda, por clave de grupo, los ítems elegidos.
  const [seleccion, setSeleccion] = useState({})
  // desplegadas guarda, por clave de grupo, el id de la estación abierta.
  const [desplegadas, setDesplegadas] = useState({})

  const seleccionadosDe = (clave) => seleccion[clave] || []

  // ¿Ya está elegido todo lo que este grupo necesita?
  const requisitosCumplidos = (grupo) =>
    (grupo.requiere || []).every((clave) => seleccionadosDe(clave).length > 0)

  // Marca o desmarca un ítem dentro de su grupo y limpia los que queden inválidos.
  function alSeleccionar(grupo, item, hermanos) {
    if (item.estado && item.estado !== 'Disponible') return

    if (grupo.requiere && !requisitosCumplidos(grupo)) {
      window.alert(grupo.aviso || 'Primero debes completar tu selección.')
      return
    }

    const actuales = seleccionadosDe(grupo.clave)
    const yaEsta = actuales.some((elegido) => elegido.id === item.id)
    let nuevos

    if (yaEsta) {
      nuevos = actuales.filter((elegido) => elegido.id !== item.id)
    } else if (grupo.multiple) {
      nuevos = [...actuales, item]
    } else {
      nuevos = [item]
    }

    const nueva = { ...seleccion, [grupo.clave]: nuevos }

    // Si perdimos el servicio o la estación, se vacían los grupos que dependían de ellos.
    hermanos.forEach((g) => {
      if (g.requiere && (nueva[g.clave] || []).length > 0) {
        const cumplido = g.requiere.every((clave) => (nueva[clave] || []).length > 0)
        if (!cumplido) nueva[g.clave] = []
      }
    })

    setSeleccion(nueva)
  }

  // Abre una estación y cierra la anterior del mismo grupo.
  function alDesplegar(claveGrupo, id) {
    setDesplegadas((previas) => ({
      ...previas,
      [claveGrupo]: previas[claveGrupo] === id ? null : id,
    }))
  }

  // Calcula el texto, el total y si se puede confirmar el panel de una categoría.
  function calcularPanel(grupos, obligatorios = []) {
    const elegidos = grupos.filter((g) => seleccionadosDe(g.clave).length > 0)
    const faltantes = obligatorios.filter((clave) => seleccionadosDe(clave).length === 0)

    let texto
    if (elegidos.length === 0) {
      texto = faltantes.length
        ? 'Para comprar debes elegir un Servicio y una Estación.'
        : 'Selecciona lo que quieras para armar tu combo.'
    } else {
      texto =
        'Tu selección: ' +
        elegidos
          .map((g) => `${g.etiqueta}: ${seleccionadosDe(g.clave).map((i) => i.titulo).join(', ')}`)
          .join(' + ')

      if (faltantes.length > 0) {
        const nombres = faltantes.map((clave) => {
          const g = grupos.find((gr) => gr.clave === clave)
          return g ? g.etiqueta : clave
        })
        texto += `. Falta elegir: ${nombres.join(' y ')} para poder comprar.`
      }
    }

    const total =
      elegidos.length === 0
        ? ''
        : 'Total: ' +
          formatearPrecio(
            elegidos.reduce(
              (suma, g) =>
                suma + seleccionadosDe(g.clave).reduce((subtotal, i) => subtotal + (i.precio || 0), 0),
              0
            )
          )

    return {
      texto,
      total,
      puedeConfirmar: elegidos.length > 0 && faltantes.length === 0,
    }
  }

  // Al confirmar, la compra queda pendiente de pago y se pasa a la vista de pago.
  function confirmarReserva(categoriaClave, grupos) {
    const elegidos = grupos.filter((g) => seleccionadosDe(g.clave).length > 0)
    if (elegidos.length === 0) return

    const reserva = {
      categoria: categoriaClave,
      items: elegidos.flatMap((g) =>
        seleccionadosDe(g.clave).map((item) => ({
          tipo: g.etiqueta,
          nombre: item.titulo,
          precio: item.precio || 0,
          sufijo: item.sufijo || '',
        }))
      ),
      usuario: sesion ? `${sesion.nombre} (${sesion.email})` : 'Invitado',
      fecha: new Date().toLocaleString('es-CO'),
    }

    localStorage.setItem('pagoPendienteZona12', JSON.stringify(reserva))

    // Limpiamos la selección de esa categoría antes de ir al pago.
    const nueva = { ...seleccion }
    grupos.forEach((g) => {
      nueva[g.clave] = []
    })
    setSeleccion(nueva)

    onNavegar('pago')
  }

  const bloqueado = !sesion

  return (
    <section
      id="catalogo"
      className={bloqueado ? 'bloqueado' : ''}
      onClick={bloqueado ? () => onNavegar('sesion') : undefined}
    >
      <h2>Catálogo de Servicios</h2>
      <p>En nuestro catálogo encontrarás todos los servicios y equipos que tenemos disponibles en Zona 12.</p>

      <div className="aviso-catalogo">
        <p>🔒 Debes iniciar sesión para elegir equipos, combos y reservar en Zona 12.</p>
        <a
          href="#sesion"
          onClick={(evento) => {
            evento.preventDefault()
            onNavegar('sesion')
          }}
        >
          Iniciar sesión
        </a>
      </div>

      <Combos
        seleccionadosIds={seleccionadosDe(grupoCombos.clave).map((item) => item.id)}
        idDesplegada={desplegadas[grupoCombos.clave]}
        onSeleccionar={(item) => alSeleccionar(grupoCombos, item, [grupoCombos])}
        onDesplegar={(id) => alDesplegar(grupoCombos.clave, id)}
        panel={calcularPanel([grupoCombos])}
        onConfirmar={() => confirmarReserva('combos', [grupoCombos])}
      />

      <Filtros activa={categoriaActiva} onCambiar={setCategoriaActiva} />

      {categorias.map((categoria) => (
        <Categoria
          key={categoria.clave}
          categoria={categoria}
          oculta={categoria.clave !== categoriaActiva}
          seleccion={seleccion}
          desplegadas={desplegadas}
          onSeleccionar={(grupo, item) => alSeleccionar(grupo, item, categoria.grupos)}
          onDesplegar={alDesplegar}
          panel={calcularPanel(categoria.grupos, categoria.obligatorios)}
          onConfirmar={() => confirmarReserva(categoria.clave, categoria.grupos)}
        />
      ))}
    </section>
  )
}

export default Catalogo
