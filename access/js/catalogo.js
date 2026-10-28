  // --- 7. CATÁLOGO INTERACTIVO: SELECCIÓN Y RESERVA (ARRAYS + localStorage) ---
    // Cada grupo de tarjetas se pinta desde un array y permite elegir UN solo ítem.
    // Los grupos se organizan por categoría y cada categoría tiene su panel de resumen.

    const formatearPrecio = (valor) => '$' + valor.toLocaleString('es-CO');

    // --- Datos de las tarjetas (arrays de objetos) ---

    // Servicios de PC
    const serviciosPC = [
        {
            id: 'sp-1',
            titulo: 'Alquiler por Hora (PC Gamer)',
            detalle: 'Acceso a computadores de alta gama con monitores de 144Hz para juego competitivo y casual.',
            precio: 2500,
            sufijo: '/ hora'
        },
        {
            id: 'sp-2',
            titulo: 'Pase Libre Universitario',
            detalle: 'Uso de PC para trabajos académicos, internet de alta velocidad e impresiones.',
            precio: 20000,
            sufijo: '/ día'
        },
        {
            id: 'sp-3',
            titulo: 'Streaming & Content Room',
            detalle: 'Espacio equipado con cámara, micrófono profesional y PC para transmitir en vivo.',
            precio: 3000,
            sufijo: '/ hora'
        }
    ];

    // Estaciones de PC (con estado Disponible / Ocupada)
    const computadoras = [
        {
            id: 'pc-1',
            titulo: 'PC #01',
            estado: 'Disponible',
            precio: 2500,
            sufijo: '/ hora',
            specs: [
                { etiqueta: 'GPU', valor: 'RTX 4060' },
                { etiqueta: 'CPU', valor: 'Ryzen 5 5600X' },
                { etiqueta: 'RAM', valor: '16 GB' },
                { etiqueta: 'Monitor', valor: '144 Hz' }
            ]
        },
        {
            id: 'pc-2',
            titulo: 'PC #02',
            estado: 'Disponible',
            precio: 2500,
            sufijo: '/ hora',
            specs: [
                { etiqueta: 'GPU', valor: 'RTX 4070' },
                { etiqueta: 'CPU', valor: 'Ryzen 7 5800X' },
                { etiqueta: 'RAM', valor: '32 GB' },
                { etiqueta: 'Monitor', valor: '165 Hz' }
            ]
        },
        {
            id: 'pc-3',
            titulo: 'PC #03',
            estado: 'Ocupada',
            precio: 2500,
            sufijo: '/ hora',
            specs: [
                { etiqueta: 'GPU', valor: 'RTX 3080' },
                { etiqueta: 'CPU', valor: 'Intel i7-12700K' },
                { etiqueta: 'RAM', valor: '32 GB' },
                { etiqueta: 'Monitor', valor: '240 Hz' }
            ]
        },
        {
            id: 'pc-4',
            titulo: 'PC #04',
            estado: 'Disponible',
            precio: 3000,
            sufijo: '/ hora',
            specs: [
                { etiqueta: 'GPU', valor: 'RTX 4090' },
                { etiqueta: 'CPU', valor: 'Intel i9-13900K' },
                { etiqueta: 'RAM', valor: '64 GB' },
                { etiqueta: 'Monitor', valor: '360 Hz' }
            ]
        },
        {
            id: 'pc-5',
            titulo: 'PC #05',
            estado: 'Ocupada',
            precio: 2500,
            sufijo: '/ hora',
            specs: [
                { etiqueta: 'GPU', valor: 'RTX 3060' },
                { etiqueta: 'CPU', valor: 'Ryzen 5 3600' },
                { etiqueta: 'RAM', valor: '16 GB' },
                { etiqueta: 'Monitor', valor: '144 Hz' }
            ]
        }
    ];

    // Estaciones de consola (con estado Disponible / Ocupada)
    const consolas = [
        {
            id: 'co-1',
            titulo: 'PS5 #01',
            estado: 'Disponible',
            detalle: 'Silla ergonómica, pantalla 4K y mandos de última generación.',
            precio: 3500,
            sufijo: '/ hora'
        },
        {
            id: 'co-2',
            titulo: 'Xbox Series X #02',
            estado: 'Disponible',
            detalle: 'Silla ergonómica, pantalla 4K y mandos inalámbricos.',
            precio: 3500,
            sufijo: '/ hora'
        },
        {
            id: 'co-3',
            titulo: 'PS5 #03',
            estado: 'Ocupada',
            detalle: 'Silla ergonómica, pantalla 4K y mandos de última generación.',
            precio: 3500,
            sufijo: '/ hora'
        },
        {
            id: 'co-4',
            titulo: 'Nintendo Switch #04',
            estado: 'Disponible',
            detalle: 'Ideal para jugar en grupo con 4 mandos.',
            precio: 3000,
            sufijo: '/ hora'
        }
    ];

    // Servicios y torneos de la zona de consolas
    const serviciosConsola = [
        {
            id: 'sc-1',
            titulo: 'Zona Multiplayer (4 Controles)',
            detalle: 'Ideal para jugar en grupo títulos locales de peleas, deportes o carreras.',
            precio: 3000,
            sufijo: '/ hora por persona'
        },
        {
            id: 'sc-2',
            titulo: 'Torneos y Competencias',
            detalle: 'Inscripción a torneos semanales con premios y acceso a la consola de competencia.',
            precio: 7000,
            sufijo: '/ evento'
        },
        {
            id: 'sc-3',
            titulo: 'Pase Nocturno Gamer',
            detalle: 'Sesión extendida de consola de 8:00 p.m. a 12:00 a.m. con snack incluido.',
            precio: 12000,
            sufijo: '/ noche'
        }
    ];

    // Snacks y bebidas (el mismo array se reutiliza en las dos categorías)
    const snacks = [
        { id: 'sn-1', titulo: 'Maní', precio: 3000 },
        { id: 'sn-2', titulo: 'Gaseosa', precio: 4500 },
        { id: 'sn-3', titulo: 'Café', precio: 3500 },
        { id: 'sn-4', titulo: 'Papas Fritas', precio: 4000 },
        { id: 'sn-5', titulo: 'Chocolatina', precio: 2500 }
    ];

    // --- Grupos de selección: cada uno se pinta en su contenedor ---
    const grupos = [
        { clave: 'servicioPC', categoria: 'computadoras', contenedor: 'grid-servicios-pc', etiqueta: 'Servicio', items: serviciosPC, seleccionado: null },
        { clave: 'pc', categoria: 'computadoras', contenedor: 'grid-pcs', etiqueta: 'PC', items: computadoras, seleccionado: null },
        { clave: 'snackPc', categoria: 'computadoras', contenedor: 'grid-snacks', etiqueta: 'Snack', items: snacks, seleccionado: null },
        { clave: 'estacionConsola', categoria: 'consolas', contenedor: 'grid-consolas', etiqueta: 'Estación', items: consolas, seleccionado: null },
        { clave: 'servicioConsola', categoria: 'consolas', contenedor: 'grid-servicios-consola', etiqueta: 'Servicio', items: serviciosConsola, seleccionado: null },
        { clave: 'snackConsola', categoria: 'consolas', contenedor: 'grid-snacks-consolas', etiqueta: 'Snack', items: snacks, seleccionado: null }
    ];

    // Pinta un grupo completo de tarjetas en su contenedor
    function pintarGrupo(grupo) {
        const contenedor = document.getElementById(grupo.contenedor);
        if (!contenedor) return;

        contenedor.innerHTML = grupo.items.map(item => {
            const disponible = !item.estado || item.estado === 'Disponible';

            const etiquetaEstado = item.estado
                ? `<span class="estado ${disponible ? 'estado-disponible' : 'estado-ocupada'}">${item.estado}</span>`
                : '';

            const specs = item.specs
                ? `<ul class="specs-pc">${item.specs.map(s => `<li><strong>${s.etiqueta}:</strong> ${s.valor}</li>`).join('')}</ul>`
                : '';

            const detalle = item.detalle ? `<p>${item.detalle}</p>` : '';

            const precio = item.precio
                ? `<p><strong>${formatearPrecio(item.precio)}${item.sufijo ? ' ' + item.sufijo : ''}</strong></p>`
                : '';

            return `
                <article class="tarjeta-seleccion ${disponible ? '' : 'ocupada'}" data-id="${item.id}">
                    ${etiquetaEstado}
                    <h4>${item.titulo}</h4>
                    ${specs}
                    ${detalle}
                    ${precio}
                    <button type="button" class="btn-seleccion" ${disponible ? '' : 'disabled'}>
                        ${disponible ? 'Seleccionar' : 'No disponible'}
                    </button>
                </article>
            `;
        }).join('');
    }

    // Marca visualmente la tarjeta elegida dentro de un grupo
    function marcarSeleccion(grupo) {
        const contenedor = document.getElementById(grupo.contenedor);
        if (!contenedor) return;

        contenedor.querySelectorAll('.tarjeta-seleccion').forEach(tarjeta => {
            const activa = grupo.seleccionado && String(grupo.seleccionado.id) === tarjeta.dataset.id;
            tarjeta.classList.toggle('seleccionada', activa);

            const boton = tarjeta.querySelector('.btn-seleccion');
            if (boton && !boton.disabled) {
                boton.textContent = activa ? 'Quitar' : 'Seleccionar';
            }
        });
    }

    // Activa los clics de un grupo usando delegación de eventos
    function activarGrupo(grupo) {
        const contenedor = document.getElementById(grupo.contenedor);
        if (!contenedor) return;

        pintarGrupo(grupo);

        contenedor.addEventListener('click', (evento) => {
            const tarjeta = evento.target.closest('.tarjeta-seleccion');
            if (!tarjeta || tarjeta.classList.contains('ocupada')) return;

            const id = tarjeta.dataset.id;

            // Si se pulsa de nuevo el mismo ítem, se deselecciona
            grupo.seleccionado = (grupo.seleccionado && String(grupo.seleccionado.id) === id)
                ? null
                : grupo.items.find(item => String(item.id) === id);

            marcarSeleccion(grupo);
            actualizarPaneles();
        });
    }

    const gruposDeCategoria = (categoria) => grupos.filter(g => g.categoria === categoria);

    // Refresca el texto y el botón del panel de cada categoría
    function actualizarPaneles() {
        document.querySelectorAll('.panel-reserva').forEach(panel => {
            const seleccionados = gruposDeCategoria(panel.dataset.categoriaPanel).filter(g => g.seleccionado);

            const texto = panel.querySelector('.texto-reserva');
            const boton = panel.querySelector('.btn-confirmar');

            if (texto) {
                texto.textContent = seleccionados.length === 0
                    ? 'Selecciona lo que quieras para armar tu combo.'
                    : 'Tu selección: ' + seleccionados
                        .map(g => `${g.etiqueta}: ${g.seleccionado.titulo}`)
                        .join(' + ');
            }

            if (boton) {
                boton.disabled = seleccionados.length === 0;
            }
        });
    }

    // Guarda la reserva en localStorage y muestra la confirmación en pantalla
    function confirmarReserva(panel) {
        const categoria = panel.dataset.categoriaPanel;
        const seleccionados = gruposDeCategoria(categoria).filter(g => g.seleccionado);

        const reserva = {
            categoria,
            items: seleccionados.map(g => ({
                tipo: g.etiqueta,
                nombre: g.seleccionado.titulo,
                precio: g.seleccionado.precio || 0,
                sufijo: g.seleccionado.sufijo || ''
            })),
            fecha: new Date().toLocaleString('es-CO')
        };

        const reservasGuardadas = JSON.parse(localStorage.getItem('reservasZona12')) || [];
        reservasGuardadas.push(reserva);
        localStorage.setItem('reservasZona12', JSON.stringify(reservasGuardadas));

        mostrarConfirmacion(panel, reserva);

        // Limpiamos la selección de esa categoría después de confirmar
        gruposDeCategoria(categoria).forEach(g => {
            g.seleccionado = null;
            marcarSeleccion(g);
        });
        actualizarPaneles();
    }

    function mostrarConfirmacion(panel, reserva) {
        const contenedor = panel.querySelector('.confirmacion-reserva');
        if (!contenedor) return;

        const filas = reserva.items.map(item => `
            <p><strong>${item.tipo}:</strong> ${item.nombre}${item.precio ? ' — ' + formatearPrecio(item.precio) + ' ' + item.sufijo : ''}</p>
        `).join('');

        contenedor.innerHTML = `
            <p class="exito">✅ ¡Reserva registrada, nos vemos en Zona 12!</p>
            ${filas}
            <small>${reserva.fecha}</small>
        `;
        contenedor.classList.add('visible');
    }

    // --- Inicialización: pintar grupos y conectar los paneles ---
    grupos.forEach(activarGrupo);

    document.querySelectorAll('.panel-reserva').forEach(panel => {
        const boton = panel.querySelector('.btn-confirmar');
        if (boton) {
            boton.addEventListener('click', () => confirmarReserva(panel));
        }
    });

    actualizarPaneles();
