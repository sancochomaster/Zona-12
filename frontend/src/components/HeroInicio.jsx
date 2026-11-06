// Contenido central del inicio: título, descripción, botones de acción y estadísticas.

function HeroInicio() {
  return (
    <div className="hero-contenido">
      <h1>ZONA 12 <span>// El Núcleo Gamer de Cali</span></h1>
      <p className="tagline">PCs de alta gama, consolas de última generación y el mejor ambiente cyberpunk para tus
        partidas.
        Entra al juego.</p>

      <div className="cta-inicio">
        <a className="cta-principal" href="#catalogo">Ver Catálogo</a>
        <a className="cta-secundario" href="#contacto">Reserva / Contacto</a>
      </div>

      <ul className="stats-inicio">
        <li>⚡ 1 Gbps de Fibra Óptica</li>
        <li>💻 PCs RTX de última generación</li>
        <li>🎮 Zonas de Consolas exclusivas</li>
      </ul>
    </div>
  )
}

export default HeroInicio
