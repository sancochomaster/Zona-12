// ==========================================
// LÓGICA PRINCIPAL - ZONA 12
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GESTIÓN DEL FORMULARIO DE CONTACTO ---
    const formContacto = document.getElementById('form-contacto');

    if (formContacto) {
        formContacto.addEventListener('submit', function(evento) {
            evento.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            // Asegúrate de que tu textarea en el HTML tenga id="mensaje"
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

    // --- 2. GESTIÓN DEL LOGIN Y PANEL DE ADMIN ---
    const formLogin = document.getElementById('form-login');
    const contenedorMensajesAdmin = document.getElementById('mensajes-admin');

    // Ocultar el panel de mensajes al inicio si existe
    if (contenedorMensajesAdmin) {
        contenedorMensajesAdmin.style.display = 'none';
    }

    if (formLogin) {
        formLogin.addEventListener('submit', function(evento) {
            evento.preventDefault();

            const usuarioInput = document.getElementById('usuario').value;
            const passwordInput = document.getElementById('password').value;

            // Credenciales de prueba para el administrador
            const usuarioAdmin = "admin";
            const passwordAdmin = "1234";

            if (usuarioInput === usuarioAdmin && passwordInput === passwordAdmin) {
                alert("¡Acceso concedido! Bienvenido al panel de administración.");
                
                // Ocultamos el formulario de login y mostramos los mensajes
                formLogin.style.display = 'none';
                if (contenedorMensajesAdmin) {
                    contenedorMensajesAdmin.style.display = 'block';
                    cargarMensajesAdmin();
                }
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        });
    }

    // Función para pintar los mensajes en el panel
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

});