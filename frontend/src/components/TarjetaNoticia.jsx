// Tarjeta lateral derecha con una noticia gamer tomada al azar.

import { noticiasGamer } from '../data/catalogo'

function TarjetaNoticia() {
  const noticia = noticiasGamer[Math.floor(Math.random() * noticiasGamer.length)]

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
