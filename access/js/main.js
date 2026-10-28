// ==========================================
// LÓGICA COMPLETA - ZONA 12 (VAPORWAVE)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NAVEGACIÓN CON DESPLAZAMIENTO SUAVE + ANIMACIÓN DE ENTRADA ---
    const enlacesNav = document.querySelectorAll('header nav a');

    let temporizadorFinScroll = null;

    // Reproduce la animación (quitando y volviendo a poner la clase para poder repetirla)
    function animarEntrada(seccion, clase) {
        seccion.classList.remove('animar-subida', 'animar-bajada');
        void seccion.offsetWidth; // fuerza un reflow y reinicia la animación
        seccion.classList.add(clase);
    }

    // Ejecuta el callback cuando el scroll se detiene (o tras 1s como máximo)
    function alTerminarElScroll(callback) {
        function finalizar() {
            clearTimeout(respaldo);
            clearTimeout(temporizadorFinScroll);
            window.removeEventListener('scroll', reiniciar);
            callback();
        }

        function reiniciar() {
            clearTimeout(temporizadorFinScroll);
            temporizadorFinScroll = setTimeout(finalizar, 120);
        }

        const respaldo = setTimeout(finalizar, 1000);
        window.addEventListener('scroll', reiniciar);
        reiniciar();
    }

    enlacesNav.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Verificar que sea un enlace interno (que empiece con #)
            if (href && href.startsWith('#')) {
                e.preventDefault(); // Detiene el salto brusco inmediato

                const seccionDestino = document.querySelector(href);
                if (!seccionDestino) return;

                // ¿Vamos hacia abajo o hacia arriba en la página?
                const destinoY = seccionDestino.getBoundingClientRect().top + window.scrollY;
                const bajando = destinoY > window.scrollY + 1;
                const claseAnimacion = bajando ? 'animar-subida' : 'animar-bajada';

                seccionDestino.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Animamos al terminar el scroll para que el efecto se vea bien
                alTerminarElScroll(() => animarEntrada(seccionDestino, claseAnimacion));
            }
        });
    });

    // --- 2. CAMBIO DE CATEGORÍA CON TRANSICIÓN SUAVE ---
    const botonesFiltro = document.querySelectorAll('.filtro-btn');
    const categorias = document.querySelectorAll('.categoria-catalogo');

    function mostrarCategoria(nombre) {
        categorias.forEach(cat => {
            const coincide = cat.dataset.categoria === nombre;
            const estaOculta = cat.classList.contains('categoria-oculta');

            if (coincide && estaOculta) {
                // Mostrar: partimos de opacity 0 y dejamos que transicione a visible
                cat.classList.remove('categoria-oculta', 'categoria-saliendo');
                cat.classList.add('categoria-entrando');

                // Doble rAF: fuerza al navegador a pintar el estado inicial
                // antes de quitar la clase, si no, la transición se salta.
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        cat.classList.remove('categoria-entrando');
                    });
                });
            } else if (!coincide && !estaOculta) {
                // Ocultar: animamos la salida y solo al terminar aplicamos display:none
                cat.classList.add('categoria-saliendo');

                cat.addEventListener('transitionend', function alTerminar() {
                    cat.classList.remove('categoria-saliendo');
                    cat.classList.add('categoria-oculta');
                }, { once: true });
            }
        });

        botonesFiltro.forEach(btn => {
            btn.classList.toggle('activo', btn.dataset.categoria === nombre);
        });
    }

    botonesFiltro.forEach(btn => {
        btn.addEventListener('click', () => mostrarCategoria(btn.dataset.categoria));
    });

    // --- 3. GESTIÓN DEL FORMULARIO DE CONTACTO ---
    const formContacto = document.getElementById('form-contacto');

    if (formContacto) {
        formContacto.addEventListener('submit', function (evento) {
            evento.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje') ? document.getElementById('mensaje').value : 'Sin mensaje';

            const nuevoMensaje = {
                nombre,
                email,
                mensaje,
                fecha: new Date().toLocaleDateString()
            };

            let mensajesGuardados = JSON.parse(localStorage.getItem('mensajesZona12')) || [];
            mensajesGuardados.push(nuevoMensaje);
            localStorage.setItem('mensajesZona12', JSON.stringify(mensajesGuardados));

            alert(`¡Gracias, ${nombre}! Tu mensaje fue enviado y registrado en el sistema.`);
            formContacto.reset();
        });
    }

    // --- 4. GESTIÓN DEL LOGIN Y PANEL DE ADMIN ---
    const formLogin = document.getElementById('form-login');
    const contenedorMensajesAdmin = document.getElementById('mensajes-admin');

    if (contenedorMensajesAdmin) {
        contenedorMensajesAdmin.style.display = 'none';
    }

    if (formLogin) {
        formLogin.addEventListener('submit', function (evento) {
            evento.preventDefault();

            const usuarioInput = document.getElementById('usuario').value;
            const passwordInput = document.getElementById('password').value;

            // Credenciales de prueba
            const usuarioAdmin = "admin";
            const passwordAdmin = "1234";

            if (usuarioInput === usuarioAdmin && passwordInput === passwordAdmin) {
                alert("¡Acceso concedido! Bienvenido al panel de administración.");

                formLogin.style.display = 'none';
                if (contenedorMensajesAdmin) {
                    contenedorMensajesAdmin.style.display = 'block';
                    cargarMensajesAdmin();
                    cargarReservasAdmin();
                }
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        });
    }

    function cargarMensajesAdmin() {
        const listaMensajes = document.getElementById('lista-mensajes');
        if (!listaMensajes) return;

        const mensajesGuardados = JSON.parse(localStorage.getItem('mensajesZona12')) || [];

        if (mensajesGuardados.length === 0) {
            listaMensajes.innerHTML = '<p style="color: #b1a7d8;">No hay mensajes nuevos en el sistema.</p>';
        } else {
            listaMensajes.innerHTML = mensajesGuardados.map((m, index) => `
                <div style="background: #0d0221; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; border: 1px solid #32145a;">
                    <p style="color: #ff2a8d; font-weight: bold;">Mensaje #${index + 1}</p>
                    <p style="color: #05d9e8;"><strong>De:</strong> ${m.nombre} (${m.email})</p>
                    <p style="color: #f8f8f2; margin: 0.5rem 0;">${m.mensaje}</p>
                    <small style="color: #b1a7d8;">Recibido el: ${m.fecha}</small>
                </div>
            `).join('');
        }
    }

    // Lista las reservas del catálogo guardadas en localStorage
    function cargarReservasAdmin() {
        const listaReservas = document.getElementById('lista-reservas');
        if (!listaReservas) return;

        const formatearPrecio = (valor) => '$' + valor.toLocaleString('es-CO');
        const reservasGuardadas = JSON.parse(localStorage.getItem('reservasZona12')) || [];

        if (reservasGuardadas.length === 0) {
            listaReservas.innerHTML = '<p style="color: #b1a7d8;">No hay reservas registradas todavía.</p>';
            return;
        }

        listaReservas.innerHTML = reservasGuardadas.map((reserva, index) => {
            const filas = reserva.items.map(item => `
                <p style="color: #f8f8f2; margin: 0.3rem 0;">
                    <strong style="color: #05d9e8;">${item.tipo}:</strong> ${item.nombre}${item.precio ? ' — ' + formatearPrecio(item.precio) + ' ' + item.sufijo : ''}
                </p>
            `).join('');

            const total = reserva.items.reduce((suma, item) => suma + (item.precio || 0), 0);

            return `
                <div style="background: #0d0221; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; border: 1px solid #32145a;">
                    <p style="color: #ff2a8d; font-weight: bold;">Reserva #${index + 1} — ${reserva.categoria}</p>
                    ${filas}
                    <p style="color: #f8f8f2; margin-top: 0.5rem;"><strong>Total:</strong> ${formatearPrecio(total)}</p>
                    <small style="color: #b1a7d8;">Fecha: ${reserva.fecha}</small>
                </div>
            `;
        }).join('');
    }

    // --- 5. BOTÓN FLOTANTE "VOLVER ARRIBA" ---
    // Crear el botón en el DOM dinámicamente
    const btnArriba = document.createElement('button');
    btnArriba.innerHTML = '▲';
    btnArriba.id = 'btn-arriba';
    btnArriba.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 12px 16px;
        background: linear-gradient(90deg, #ff2a8d, #05d9e8);
        color: #fff;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        box-shadow: 0 0 15px rgba(255, 42, 141, 0.6);
        z-index: 1000;
        transition: transform 0.3s ease;
    `;
    document.body.appendChild(btnArriba);

    // Mostrar/ocultar según el scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btnArriba.style.display = 'block';
        } else {
            btnArriba.style.display = 'none';
        }
    });

    // Acción de volver arriba al hacer clic
    btnArriba.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- 6. TARJETAS DEL HERO (CUENTA ATRÁS GTA 6 + NOTICIA ALEATORIA) ---

    // Cuenta atrás hasta el lanzamiento de GTA 6 (19 de noviembre)
    const fechaGTA6 = new Date('2026-11-19T00:00:00');

    function actualizarContador() {
        const diasEl = document.getElementById('contador-dias');
        const horasEl = document.getElementById('contador-horas');
        const minEl = document.getElementById('contador-min');
        const segEl = document.getElementById('contador-seg');

        if (!diasEl || !horasEl || !minEl || !segEl) return;

        const restante = fechaGTA6 - new Date();
        const dosDigitos = (n) => String(n).padStart(2, '0');

        if (restante <= 0) {
            diasEl.textContent = '00';
            horasEl.textContent = '00';
            minEl.textContent = '00';
            segEl.textContent = '00';
            return;
        }

        const dias = Math.floor(restante / (1000 * 60 * 60 * 24));
        const horas = Math.floor(restante / (1000 * 60 * 60)) % 24;
        const minutos = Math.floor(restante / (1000 * 60)) % 60;
        const segundos = Math.floor(restante / 1000) % 60;

        diasEl.textContent = dosDigitos(dias);
        horasEl.textContent = dosDigitos(horas);
        minEl.textContent = dosDigitos(minutos);
        segEl.textContent = dosDigitos(segundos);
    }

    actualizarContador();
    setInterval(actualizarContador, 1000);

    // Noticia gamer aleatoria
    const noticiasGamer = [
        {
            titulo: 'Los esports siguen creciendo en Latinoamérica',
            texto: 'Cada vez más torneos regionales de videojuegos reúnen a equipos y público en ciudades como Bogotá, Medellín y Cali.'
        },
        {
            titulo: 'Nuevos juegos indie que debes probar',
            texto: 'El catálogo indie no deja de sorprender con propuestas creativas de estudio pequeños que se vuelven virales.'
        },
        {
            titulo: 'Las tarjetas gráficas RTX marcan la pauta',
            texto: 'El ray tracing y el alto rendimiento en 4K se volvieron el estándar para los jugadores de PC más exigentes.'
        },
        {
            titulo: 'Los remakes nostálgicos vuelven con fuerza',
            texto: 'Los clásicos de los 80 y 90 regresan con gráficos modernos, conquistando a veteranos y a nuevas generaciones.'
        },
        {
            titulo: 'Nuevos computadores han llegado!',
            texto: 'La nueva ola de computadores ha llegado a zona 12'
        },
          {
            titulo: 'El gaming móvil no se detiene',
            texto: 'Millones de jugadores ya compiten desde el celular, y los torneos móviles ganan cada vez más premios.'
        }
    ];

    const tituloNoticia = document.getElementById('noticia-titulo');
    const textoNoticia = document.getElementById('noticia-texto');

    if (tituloNoticia && textoNoticia) {
        const noticia = noticiasGamer[Math.floor(Math.random() * noticiasGamer.length)];
        tituloNoticia.textContent = noticia.titulo;
        textoNoticia.textContent = noticia.texto;
    }

});