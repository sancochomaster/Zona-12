// --- LÓGICA DE LA PESTAÑA DE PAGO ---
// Toma la compra pendiente guardada por el catálogo y solo la registra en el
// panel del administrador (clave 'reservasZona12') cuando el pago se completa.
// Las compras sin pagar nunca llegan al admin.

const formatearPrecio = (valor) => '$' + valor.toLocaleString('es-CO');

// Dirección del servidor backend (Express). Cámbiala si usas otro puerto.
const API = 'http://localhost:4000';

document.addEventListener('DOMContentLoaded', () => {
    const resumen = document.getElementById('pago-resumen');
    const formPago = document.getElementById('form-pago');
    const btnCancelar = document.getElementById('btn-cancelar-pago');
    const mensajePago = document.getElementById('pago-mensaje');

    const compra = JSON.parse(localStorage.getItem('pagoPendienteZona12'));

    // Sin compra pendiente no hay nada que pagar
    if (!compra) {
        if (formPago) formPago.style.display = 'none';
        if (resumen) {
            resumen.innerHTML = `
                <p class="pago-vacio">
                    No tienes ninguna compra pendiente de pago.
                    <a href="index.html#catalogo">Volver al catálogo</a>.
                </p>
            `;
        }
        return;
    }

    // Pintamos el resumen de la compra pendiente
    if (resumen) {
        const filas = compra.items.map(item => `
            <p class="pago-item">
                <strong>${item.tipo}:</strong> ${item.nombre}${item.precio ? ' — ' + formatearPrecio(item.precio) + ' ' + item.sufijo : ''}
            </p>
        `).join('');

        const total = compra.items.reduce((suma, item) => suma + (item.precio || 0), 0);

        resumen.innerHTML = `
            <h3>Resumen de tu compra</h3>
            <p class="pago-dato"><strong>Cliente:</strong> ${compra.usuario || 'Invitado'}</p>
            <p class="pago-dato"><strong>Categoría:</strong> ${compra.categoria}</p>
            ${filas}
            <p class="pago-total">Total a pagar: ${formatearPrecio(total)}</p>
        `;
    }

    // Al enviar el formulario damos el pago por completado
    if (formPago) {
        formPago.addEventListener('submit', async (evento) => {
            evento.preventDefault();

            // Registramos la compra pagada en la base de datos: esta es la que ve el administrador
            try {
                const respuesta = await fetch(API + '/api/reservas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(compra)
                });
                if (!respuesta.ok) throw new Error('No se pudo registrar la compra');
            } catch (error) {
                alert('No se pudo completar el pago. Revisa tu conexión e inténtalo de nuevo.');
                return;
            }

            // Ya está pagada, se elimina la compra pendiente del navegador
            localStorage.removeItem('pagoPendienteZona12');

            formPago.style.display = 'none';
            if (resumen) resumen.style.display = 'none';

            if (mensajePago) {
                mensajePago.innerHTML = `
                    <p class="pago-exito">✅ ¡Pago realizado con éxito!</p>
                    <p>Tu compra quedó registrada, nos vemos en Zona 12.</p>
                    <a class="pago-volver" href="index.html">Volver al inicio</a>
                `;
                mensajePago.classList.add('visible');
            }
        });
    }

    // Cancelar: se descarta el registro y no cuenta para el administrador
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            localStorage.removeItem('pagoPendienteZona12');
            alert('Pago cancelado. Tu registro no fue enviado al administrador.');
            window.location.href = 'index.html';
        });
    }
});
