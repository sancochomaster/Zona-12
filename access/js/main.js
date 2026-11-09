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

    // Pestañas del panel: separan los mensajes de contacto de las compras de clientes
    const tabsAdmin = document.querySelectorAll('.admin-tab');

    tabsAdmin.forEach(tab => {
        tab.addEventListener('click', () => {
            tabsAdmin.forEach(t => t.classList.remove('activo'));
            document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('activo'));

            tab.classList.add('activo');
            const panelDestino = document.getElementById(tab.dataset.panel);
            if (panelDestino) panelDestino.classList.add('activo');
        });
    });

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

    // Cada mensaje de contacto se pinta como una tarjeta independiente
    function cargarMensajesAdmin() {
        const listaMensajes = document.getElementById('lista-mensajes');
        const contador = document.getElementById('contador-mensajes');
        if (!listaMensajes) return;

        const mensajesGuardados = JSON.parse(localStorage.getItem('mensajesZona12')) || [];

        if (contador) contador.textContent = mensajesGuardados.length;

        if (mensajesGuardados.length === 0) {
            listaMensajes.innerHTML = '<p class="admin-vacio">No hay mensajes de contacto registrados todavía.</p>';
            return;
        }

        listaMensajes.innerHTML = mensajesGuardados.map((m, index) => `
                <div class="admin-tarjeta">
                    <p class="admin-tarjeta-titulo">Mensaje #${index + 1}</p>
                    <p class="admin-dato"><strong>De:</strong> ${m.nombre} (${m.email})</p>
                    <p class="admin-mensaje-texto">${m.mensaje}</p>
                    <small class="admin-fecha">Recibido el: ${m.fecha}</small>
                </div>
            `).join('');
    }

    // Lista las compras pagadas del catálogo guardadas en localStorage.
    // Solo se cuentan las compras con el pago completado (pagado === true).
    function cargarReservasAdmin() {
        const listaReservas = document.getElementById('lista-reservas');
        const contador = document.getElementById('contador-compras');
        if (!listaReservas) return;

        const formatearPrecio = (valor) => '$' + valor.toLocaleString('es-CO');
        const reservasGuardadas = (JSON.parse(localStorage.getItem('reservasZona12')) || [])
            .filter(reserva => reserva.pagado === true);

        if (contador) contador.textContent = reservasGuardadas.length;

        if (reservasGuardadas.length === 0) {
            listaReservas.innerHTML = '<p class="admin-vacio">No hay compras pagadas registradas todavía.</p>';
            return;
        }

        listaReservas.innerHTML = reservasGuardadas.map((reserva, index) => {
            const filas = reserva.items.map(item => `
                    <p class="admin-item">
                        <strong>${item.tipo}:</strong> ${item.nombre}${item.precio ? ' — ' + formatearPrecio(item.precio) + ' ' + item.sufijo : ''}
                    </p>
                `).join('');

            const total = reserva.items.reduce((suma, item) => suma + (item.precio || 0), 0);

            return `
                <div class="admin-tarjeta compra">
                    <p class="admin-tarjeta-titulo">Compra #${index + 1} — ${reserva.categoria}</p>
                    <p class="admin-dato"><strong>Cliente:</strong> ${reserva.usuario || 'Invitado'}</p>
                    <div class="admin-items">${filas}</div>
                    <p class="admin-total">Total: ${formatearPrecio(total)}</p>
                    <small class="admin-fecha">Fecha: ${reserva.fecha}</small>
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

    // --- 7. CUENTAS DE USUARIO (REGISTRO + LOGIN CON localStorage) ---
    // OJO: esto es una simulación del lado del cliente (sin servidor). Sirve para
    // la demo, pero en un sitio real la autenticación debe hacerse en un backend.
    const CLAVE_USUARIOS = 'usuariosZona12';
    const CLAVE_SESION = 'sesionZona12';

    const formUsuarioLogin = document.getElementById('form-usuario-login');
    const formUsuarioRegistro = document.getElementById('form-usuario-registro');
    const vistaSesionActiva = document.getElementById('sesion-activa');
    const contenedorFormsSesion = document.getElementById('sesion-formularios');
    const mensajeSesion = document.getElementById('sesion-mensaje');
    const botonNavSesion = document.querySelector('.btn-sesion');

    // Hash SHA-256 para no guardar la contraseña en texto plano
    async function hashear(texto) {
        if (window.crypto && crypto.subtle) {
            const datos = new TextEncoder().encode(texto);
            const buffer = await crypto.subtle.digest('SHA-256', datos);
            return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
        }
        return texto;
    }

    const leerUsuarios = () => JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || [];
    const leerSesion = () => JSON.parse(localStorage.getItem(CLAVE_SESION));

    function avisoSesion(texto, esError) {
        if (!mensajeSesion) return;
        mensajeSesion.textContent = texto;
        mensajeSesion.style.color = esError ? '#ff2a8d' : '#05d9e8';
    }

    // Texto bajo el título "Mi Cuenta" según lo que se esté mostrando
    function actualizarIntroSesion() {
        const intro = document.getElementById('sesion-intro');
        if (!intro) return;

        if (leerSesion()) {
            intro.textContent = 'Ya iniciaste sesión en Zona 12. Desde aquí puedes cerrarla cuando quieras.';
        } else if (formUsuarioRegistro && formUsuarioRegistro.style.display === 'block') {
            intro.textContent = 'Crea tu cuenta con tus datos para empezar a reservar en Zona 12.';
        } else {
            intro.textContent = 'Ingresa con tu correo y contraseña para reservar y consultar con nosotros.';
        }
    }

    // Historial de compras/reservas del usuario con sesión iniciada
    function cargarMisCompras(sesion) {
        const listaCompras = document.getElementById('lista-compras');
        if (!listaCompras || !sesion) return;

        const formatearPrecio = (valor) => '$' + valor.toLocaleString('es-CO');
        // Solo mostramos las compras ya pagadas por este usuario
        const reservasGuardadas = (JSON.parse(localStorage.getItem('reservasZona12')) || [])
            .filter(r => r.pagado === true);
        const misCompras = reservasGuardadas.filter(r =>
            r.usuario && sesion.email && r.usuario.includes(sesion.email)
        );

        if (misCompras.length === 0) {
            listaCompras.innerHTML = '<p class="compra-vacia">Aún no has realizado compras. ¡Anímate a reservar en el catálogo!</p>';
            return;
        }

        listaCompras.innerHTML = misCompras.map((compra, index) => {
            const filas = compra.items.map(item => `
                <li>
                    <span>${item.nombre}</span>
                    <span class="compra-item-detalle">${item.tipo}${item.precio ? ' · ' + formatearPrecio(item.precio) + ' ' + item.sufijo : ''}</span>
                </li>
            `).join('');

            const total = compra.items.reduce((suma, item) => suma + (item.precio || 0), 0);

            return `
                <article class="compra-tarjeta">
                    <header class="compra-cabecera">
                        <span class="compra-numero">Compra #${index + 1}</span>
                        <span class="compra-categoria">${compra.categoria}</span>
                    </header>
                    <ul class="compra-items">${filas}</ul>
                    <footer class="compra-pie">
                        <span>${compra.fecha}</span>
                        <strong>${formatearPrecio(total)}</strong>
                    </footer>
                </article>
            `;
        }).join('');
    }

    // Actualiza formularios, vista de cuenta, botón del menú y formulario de contacto
    function actualizarVistaSesion() {
        const sesion = leerSesion();

        if (contenedorFormsSesion) contenedorFormsSesion.style.display = sesion ? 'none' : 'block';
        if (vistaSesionActiva) vistaSesionActiva.style.display = sesion ? 'block' : 'none';
        actualizarIntroSesion();

        if (sesion) {
            const saludoEl = document.getElementById('sesion-saludo');
            const correoEl = document.getElementById('sesion-correo');
            if (saludoEl) saludoEl.textContent = `¡Hola, ${sesion.nombre}!`;
            if (correoEl) correoEl.textContent = sesion.email;
            cargarMisCompras(sesion);
        }

        if (botonNavSesion) {
            botonNavSesion.textContent = sesion ? '👤 ' + sesion.nombre.split(' ')[0] : 'Iniciar sesión';
        }

        // Si hay sesión, rellenamos el formulario de contacto
        const campoNombre = document.getElementById('nombre');
        const campoEmail = document.getElementById('email');
        if (sesion && campoNombre && campoEmail) {
            if (!campoNombre.value) campoNombre.value = sesion.nombre;
            if (!campoEmail.value) campoEmail.value = sesion.email;
        }
    }

    function mostrarFormularioSesion(cual) {
        if (!formUsuarioLogin || !formUsuarioRegistro) return;
        formUsuarioLogin.style.display = cual === 'registro' ? 'none' : 'block';
        formUsuarioRegistro.style.display = cual === 'registro' ? 'block' : 'none';
        actualizarIntroSesion();
        avisoSesion('', false);
    }

    const irRegistro = document.getElementById('ir-registro');
    const irLogin = document.getElementById('ir-login');
    if (irRegistro) irRegistro.addEventListener('click', (e) => { e.preventDefault(); mostrarFormularioSesion('registro'); });
    if (irLogin) irLogin.addEventListener('click', (e) => { e.preventDefault(); mostrarFormularioSesion('login'); });

    if (formUsuarioRegistro) {
        formUsuarioRegistro.addEventListener('submit', async (evento) => {
            evento.preventDefault();

            const nombre = document.getElementById('ur-nombre').value.trim();
            const email = document.getElementById('ur-email').value.trim().toLowerCase();
            const password = document.getElementById('ur-password').value;
            const confirmar = document.getElementById('ur-confirmar').value;

            if (password.length < 6) return avisoSesion('La contraseña debe tener al menos 6 caracteres.', true);
            if (password !== confirmar) return avisoSesion('Las contraseñas no coinciden.', true);

            const usuarios = leerUsuarios();
            if (usuarios.some(u => u.email === email)) {
                return avisoSesion('Ya existe una cuenta con ese correo.', true);
            }

            usuarios.push({
                nombre,
                email,
                clave: await hashear(password),
                fecha: new Date().toLocaleDateString('es-CO')
            });
            localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));

            // Después de registrarse, se inicia sesión automáticamente
            localStorage.setItem(CLAVE_SESION, JSON.stringify({ nombre, email }));
            formUsuarioRegistro.reset();
            avisoSesion('¡Cuenta creada! Ya iniciaste sesión.', false);
            actualizarVistaSesion();
        });
    }

    if (formUsuarioLogin) {
        formUsuarioLogin.addEventListener('submit', async (evento) => {
            evento.preventDefault();

            const email = document.getElementById('ul-email').value.trim().toLowerCase();
            const clave = await hashear(document.getElementById('ul-password').value);
            const usuario = leerUsuarios().find(u => u.email === email && u.clave === clave);

            if (!usuario) return avisoSesion('Correo o contraseña incorrectos.', true);

            localStorage.setItem(CLAVE_SESION, JSON.stringify({ nombre: usuario.nombre, email: usuario.email }));
            formUsuarioLogin.reset();
            avisoSesion('', false);
            actualizarVistaSesion();
        });
    }

    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            localStorage.removeItem(CLAVE_SESION);
            mostrarFormularioSesion('login');
            avisoSesion('Sesión cerrada.', false);
            actualizarVistaSesion();
        });
    }

    actualizarVistaSesion();

});