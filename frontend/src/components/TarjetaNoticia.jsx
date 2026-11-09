// Tarjeta lateral derecha con una noticia gamer tomada al azar.
// La noticia se elige una sola vez, cuando la tarjeta aparece en pantalla.

import { useState } from 'react'
import { noticiasGamer } from '../data/catalogo'

function elegirNoticiaAlAzar() {
  return noticiasGamer[Math.floor(Math.random() * noticiasGamer.length)]
}

function TarjetaNoticia() {
  const [noticia] = useState(elegirNoticiaAlAzar)

  return (
    <article className="tarjeta-lateral tarjeta-noticia">
      <img src="/img/notificasfoto.png" alt="Noticia del mundo gamer" />
      <div className="tarjeta-texto">
        <span className="etiqueta-noticia">Noticia gamer</span>
        <h3>{noticia.titulo}</h3>
        <p>{noticia.texto}</p>
      </div>
    </article>
  )
}

export default TarjetaNoticia
