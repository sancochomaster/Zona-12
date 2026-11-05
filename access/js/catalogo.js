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
        precio: 1500,
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
        id: 'pc-1', titulo: 'PC #01', estado: 'Disponible', precio: 500,
        specs: [{ etiqueta: 'GPU', valor: 'RTX 4060' }, { etiqueta: 'CPU', valor: 'Ryzen 5 5600X' }, { etiqueta: 'RAM', valor: '16 GB' }, { etiqueta: 'Monitor', valor: '144 Hz' }]
    },
    {
        id: 'pc-2', titulo: 'PC #02', estado: 'Disponible', precio: 500,
        specs: [{ etiqueta: 'GPU', valor: 'RTX 4070' }, { etiqueta: 'CPU', valor: 'Ryzen 7 5800X' }, { etiqueta: 'RAM', valor: '32 GB' }, { etiqueta: 'Monitor', valor: '165 Hz' }]
    },
    {
        id: 'pc-3', titulo: 'PC #03', estado: 'Ocupada', precio: 500,
        specs: [{ etiqueta: 'GPU', valor: 'RTX 3080' }, { etiqueta: 'CPU', valor: 'Intel i7-12700K' }, { etiqueta: 'RAM', valor: '32 GB' }, { etiqueta: 'Monitor', valor: '240 Hz' }]
    },
    {
        id: 'pc-4', titulo: 'PC #04', estado: 'Disponible', precio: 600,
        specs: [{ etiqueta: 'GPU', valor: 'RTX 4090' }, { etiqueta: 'CPU', valor: 'Intel i9-13900K' }, { etiqueta: 'RAM', valor: '64 GB' }, { etiqueta: 'Monitor', valor: '360 Hz' }]
    },
    {
        id: 'pc-5', titulo: 'PC #05', estado: 'Ocupada', precio: 500,
        specs: [{ etiqueta: 'GPU', valor: 'RTX 3060' }, { etiqueta: 'CPU', valor: 'Ryzen 5 3600' }, { etiqueta: 'RAM', valor: '16 GB' }, { etiqueta: 'Monitor', valor: '144 Hz' }]
    },
    {
        id: 'pc-6', titulo: 'PC #06', estado: 'Disponible', precio: 500,
        specs: [{ etiqueta: 'GPU', valor: 'RTX 4060' }, { etiqueta: 'CPU', valor: 'Ryzen 5 5600X' }, { etiqueta: 'RAM', valor: '16 GB' }, { etiqueta: 'Monitor', valor: '144 Hz' }]
    },
    {
        id: 'pc-7', titulo: 'PC #07', estado: 'Disponible', precio: 500,
        specs: [{ etiqueta: 'GPU', valor: 'RTX 4070' }, { etiqueta: 'CPU', valor: 'Ryzen 7 5800X' }, { etiqueta: 'RAM', valor: '32 GB' }, { etiqueta: 'Monitor', valor: '165 Hz' }]
    },
    {
        id: 'pc-8', titulo: 'PC #08', estado: 'Disponible', precio: 500,
        specs: [{ etiqueta: 'GPU', valor: 'RTX 3060 Ti' }, { etiqueta: 'CPU', valor: 'Intel i5-12400' }, { etiqueta: 'RAM', valor: '16 GB' }, { etiqueta: 'Monitor', valor: '144 Hz' }]
    },
    {
        id: 'pc-9', titulo: 'PC #09', estado: 'Disponible', precio: 600,
        specs: [{ etiqueta: 'GPU', valor: 'RTX 4080' }, { etiqueta: 'CPU', valor: 'Ryzen 9 7900X' }, { etiqueta: 'RAM', valor: '32 GB' }, { etiqueta: 'Monitor', valor: '240 Hz' }]
    },
    {
        id: 'pc-10', titulo: 'PC #10', estado: 'Disponible', precio: 500,
        specs: [{ etiqueta: 'GPU', valor: 'RTX 3070' }, { etiqueta: 'CPU', valor: 'Ryzen 7 5700X' }, { etiqueta: 'RAM', valor: '16 GB' }, { etiqueta: 'Monitor', valor: '144 Hz' }]
    }
];

// Estaciones de consola (con estado Disponible / Ocupada)
const consolas = [
    { id: 'co-1', titulo: 'PS5 #01', estado: 'Disponible', detalle: 'Silla ergonómica, pantalla 4K y mandos de última generación.', precio: 600 },
    { id: 'co-2', titulo: 'Xbox Series X #02', estado: 'Disponible', detalle: 'Silla ergonómica, pantalla 4K y mandos inalámbricos.', precio: 600 },
    { id: 'co-3', titulo: 'PS5 #03', estado: 'Ocupada', detalle: 'Silla ergonómica, pantalla 4K y mandos de última generación.', precio: 600 },
    { id: 'co-4', titulo: 'Nintendo Switch #04', estado: 'Disponible', detalle: 'Ideal para jugar en grupo con 4 mandos.', precio: 400 },
    { id: 'co-5', titulo: 'PS5 #05', estado: 'Disponible', detalle: 'Silla ergonómica, pantalla 4K y mandos de última generación.', precio: 600 },
    { id: 'co-6', titulo: 'Xbox Series S #06', estado: 'Disponible', detalle: 'Compacta y potente para tus juegos favoritos.', precio: 400 },
    { id: 'co-7', titulo: 'PS5 #07', estado: 'Disponible', detalle: 'Silla ergonómica, pantalla 4K y mandos de última generación.', precio: 600 },
    { id: 'co-8', titulo: 'Xbox Series X #08', estado: 'Disponible', detalle: 'Máximo rendimiento en 4K.', precio: 600 },
    { id: 'co-9', titulo: 'Nintendo Switch #09', estado: 'Disponible', detalle: 'Perfecta para Mario Kart y Smash Bros.', precio: 400 },
    { id: 'co-10', titulo: 'PS5 #10', estado: 'Disponible', detalle: 'Silla ergonómica, pantalla 4K y mandos de última generación.', precio: 600 }
];

// Servicios y torneos de la zona de consolas
const serviciosConsola = [
    {
        id: 'sc-0',
        titulo: 'Alquiler por Hora (Consola)',
        detalle: 'Uso individual de consola con un mando incluido.',
        precio: 1500,
        sufijo: '/ hora'
    },
    {
        id: 'sc-1',
        titulo: 'Zona Multiplayer (4 Controles)',
        detalle: 'Ideal para jugar en grupo títulos locales de peleas, deportes o carreras.',
        precio: 500,
        sufijo: '/ hora por persona'
    },
    {
        id: 'sc-2',
        titulo: 'Torneos y Competencias',
        detalle: 'Inscripción a torneos semanales con premios y acceso a la consola de competencia.',
        precio: 600,
        sufijo: '/ evento'
    }
];

// Bebidas (solo se puede elegir una)
const bebidas = [
    { id: 'be-1', titulo: 'Gaseosa', precio: 4500 },
    { id: 'be-2', titulo: 'Café', precio: 3500 },
    { id: 'be-3', titulo: 'Botella de Agua', precio: 2000 }
];

// Snacks (se pueden elegir varios; el mismo array se reutiliza en las dos categorías)
const snacks = [
    { id: 'sn-1', titulo: 'Maní', precio: 3000 },
    { id: 'sn-2', titulo: 'Papas Fritas', precio: 4000 },
    { id: 'sn-3', titulo: 'Chocolatina', precio: 2500 }
];

// Combos (paquetes con precio especial; se elige UNO)
const combos = [
    {
        id: 'cb-1',
        titulo: 'Combo Gamer PC',
        detalle: '2 horas de PC Gamer + Gaseosa + Papas Fritas.',
        precio: 9500,
        sufijo: '/ combo'
    },
    {
        id: 'cb-2',
        titulo: 'Combo Universitario',
        detalle: 'Pase Libre Universitario + Café + Chocolatina.',
        precio: 23000,
        sufijo: '/ combo'
    },
    {
        id: 'cb-3',
        titulo: 'Combo Dúo Consola',
        detalle: '2 horas de consola + 2 Bebidas + Maní para compartir.',
        precio: 12500,
        sufijo: '/ combo'
    },
    {
        id: 'cb-4',
        titulo: 'Combo Squad Multiplayer',
        detalle: 'Zona Multiplayer (4 controles) por 1 hora + 4 Gaseosas + 2 Papas Fritas.',
        precio: 24000,
        sufijo: '/ combo'
    }
];

// --- Grupos de selección: cada uno se pinta en su contenedor ---
// 'multiple: true' permite elegir varios ítems (snacks); sin él solo se elige uno.
// 'requiere' indica las claves de otros grupos que deben estar elegidas antes
// (bebidas y snacks solo se pueden pedir después de elegir el servicio y su PC/consola).
const grupos = [
    { clave: 'combo', categoria: 'combos', contenedor: 'grid-combos', etiqueta: 'Combo', items: combos, seleccionados: [] },
    { clave: 'servicioPC', categoria: 'computadoras', contenedor: 'grid-servicios-pc', etiqueta: 'Servicio', items: serviciosPC, seleccionados: [] },
    { clave: 'pc', categoria: 'computadoras', contenedor: 'grid-pcs', etiqueta: 'PC', items: computadoras, seleccionados: [] },
    {
        clave: 'bebidaPc', categoria: 'computadoras', contenedor: 'grid-bebidas', etiqueta: 'Bebida', items: bebidas, seleccionados: [],
        requiere: ['servicioPC', 'pc'],
        aviso: 'Para elegir una bebida primero debes seleccionar un Servicio de PC y una PC.'
    },
    {
        clave: 'snackPc', categoria: 'computadoras', contenedor: 'grid-snacks', etiqueta: 'Snack', items: snacks, seleccionados: [], multiple: true,
        requiere: ['servicioPC', 'pc'],
        aviso: 'Para elegir snacks primero debes seleccionar un Servicio de PC y una PC.'
    },
    { clave: 'estacionConsola', categoria: 'consolas', contenedor: 'grid-consolas', etiqueta: 'Estación', items: consolas, seleccionados: [] },
    { clave: 'servicioConsola', categoria: 'consolas', contenedor: 'grid-servicios-consola', etiqueta: 'Servicio', items: serviciosConsola, seleccionados: [] },
    {
        clave: 'bebidaConsola', categoria: 'consolas', contenedor: 'grid-bebidas-consolas', etiqueta: 'Bebida', items: bebidas, seleccionados: [],
        requiere: ['servicioConsola', 'estacionConsola'],
        aviso: 'Para elegir una bebida primero debes seleccionar un Servicio de Consola y una Estación de Consola.'
    },
    {
        clave: 'snackConsola', categoria: 'consolas', contenedor: 'grid-snacks-consolas', etiqueta: 'Snack', items: snacks, seleccionados: [], multiple: true,
        requiere: ['servicioConsola', 'estacionConsola'],
        aviso: 'Para elegir snacks primero debes seleccionar un Servicio de Consola y una Estación de Consola.'
    }
];

// Grupos que son obligatorios para poder confirmar la compra en cada categoría.
// En computadoras y consolas no basta con la estación: SIEMPRE debe ir acompañada
// de un servicio (y viceversa) para poder realizar la compra.
const obligatoriosPorCategoria = {
    computadoras: ['servicioPC', 'pc'],
    consolas: ['servicioConsola', 'estacionConsola']
};

// Pinta un grupo completo de tarjetas en su contenedor
function pintarGrupo(grupo) {
    const contenedor = document.getElementById(grupo.contenedor);
    if (!contenedor) return;

    const esEstacion = grupo.clave === 'pc' || grupo.clave === 'estacionConsola';

    if (esEstacion) {
        contenedor.classList.add('grid-estaciones');
    } else {
        contenedor.classList.remove('grid-estaciones');
    }

    contenedor.innerHTML = grupo.items.map(item => {
        const disponible = !item.estado || item.estado === 'Disponible';
        const precio = item.precio ? `<p class="precio-estacion"><strong>${formatearPrecio(item.precio)}${item.sufijo ? ' ' + item.sufijo : ''}</strong></p>` : '';

        if (esEstacion) {
            const specs = item.specs
                ? `<ul class="specs-pc">${item.specs.map(s => `<li><strong>${s.etiqueta}:</strong> ${s.valor}</li>`).join('')}</ul>`
                : '';
            const detalle = item.detalle ? `<p>${item.detalle}</p>` : '';

            return `
                    <div class="estacion-gamer ${disponible ? 'disponible' : 'ocupada'} tarjeta-seleccion" data-id="${item.id}">
                        <div class="monitor-icon">
                            <div class="pantalla">
                                <span class="num-pc">${item.titulo.split('#')[1] || ''}</span>
                            </div>
                            <div class="base-monitor"></div>
                        </div>
                        <div class="info-desplegable">
                            <h4>${item.titulo}</h4>
                            ${specs}
                            ${detalle}
                            ${precio}
                            <button type="button" class="btn-seleccion" ${disponible ? '' : 'disabled'}>
                                ${disponible ? 'Seleccionar' : 'No disponible'}
                            </button>
                        </div>
                    </div>
                `;
        }

        // Diseño de tarjeta normal para servicios, snacks y bebidas
        const etiquetaEstado = item.estado
            ? `<span class="estado ${disponible ? 'estado-disponible' : 'estado-ocupada'}">${item.estado}</span>`
            : '';
        const specsNormal = item.specs
            ? `<ul class="specs-pc">${item.specs.map(s => `<li><strong>${s.etiqueta}:</strong> ${s.valor}</li>`).join('')}</ul>`
            : '';
        const detalleNormal = item.detalle ? `<p>${item.detalle}</p>` : '';

        return `
                <article class="tarjeta-seleccion ${disponible ? '' : 'ocupada'}" data-id="${item.id}">
                    ${etiquetaEstado}
                    <h4>${item.titulo}</h4>
                    ${specsNormal}
                    ${detalleNormal}
                    ${precio}
                    <button type="button" class="btn-seleccion" ${disponible ? '' : 'disabled'}>
                        ${disponible ? 'Seleccionar' : 'No disponible'}
                    </button>
                </article>
            `;
    }).join('');
}

// ¿Está este ítem elegido dentro del grupo?
const estaSeleccionado = (grupo, id) => grupo.seleccionados.some(item => String(item.id) === String(id));

// Marca visualmente las tarjetas elegidas dentro de un grupo
function marcarSeleccion(grupo) {
    const contenedor = document.getElementById(grupo.contenedor);
    if (!contenedor) return;

    contenedor.querySelectorAll('.tarjeta-seleccion').forEach(tarjeta => {
        const activa = estaSeleccionado(grupo, tarjeta.dataset.id);
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
        if (!tarjeta) return;

        // Lógica de desplegar componentes para estaciones
        if (tarjeta.classList.contains('estacion-gamer')) {
            // Si se hizo click fuera del botón de selección, solo desplegamos
            if (!evento.target.classList.contains('btn-seleccion')) {
                // Cerramos otras estaciones abiertas en el mismo grupo
                contenedor.querySelectorAll('.estacion-gamer.desplegada').forEach(el => {
                    if (el !== tarjeta) el.classList.remove('desplegada');
                });
                tarjeta.classList.toggle('desplegada');
                return;
            }
        }

        if (tarjeta.classList.contains('ocupada')) return;

        // Si el grupo exige requisitos (bebidas/snacks), hay que cumplirlos antes
        if (grupo.requiere && !requisitosCumplidos(grupo)) {
            alert(grupo.aviso || 'Primero debes completar tu selección.');
            return;
        }

        const id = tarjeta.dataset.id;
        const item = grupo.items.find(i => String(i.id) === id);

        if (estaSeleccionado(grupo, id)) {
            // Ya estaba elegido: se quita
            grupo.seleccionados = grupo.seleccionados.filter(i => String(i.id) !== id);
        } else if (grupo.multiple) {
            // Varios permitidos: se agrega a la lista
            grupo.seleccionados.push(item);
        } else {
            // Selección única: reemplaza a la anterior
            grupo.seleccionados = [item];
        }

        marcarSeleccion(grupo);
        limpiarGruposInvalidos(grupo.categoria);
        actualizarPaneles();
    });
}

const gruposDeCategoria = (categoria) => grupos.filter(g => g.categoria === categoria);

// ¿Ya está elegido todo lo que este grupo necesita?
function requisitosCumplidos(grupo) {
    return grupo.requiere.every(clave => {
        const requisito = grupos.find(g => g.clave === clave);
        return requisito && requisito.seleccionados.length > 0;
    });
}

// Si un grupo pierde sus requisitos (se quita la PC o el servicio), se deselecciona
function limpiarGruposInvalidos(categoria) {
    gruposDeCategoria(categoria)
        .filter(g => g.requiere && g.seleccionados.length > 0 && !requisitosCumplidos(g))
        .forEach(g => {
            g.seleccionados = [];
            marcarSeleccion(g);
        });
}

// Suma el precio de todos los ítems elegidos en una lista de grupos
const totalDeGrupos = (listaGrupos) => listaGrupos.reduce((suma, g) =>
    suma + g.seleccionados.reduce((subtotal, item) => subtotal + (item.precio || 0), 0), 0);

// Refresca el texto, el total y el botón del panel de cada categoría
function actualizarPaneles() {
    document.querySelectorAll('.panel-reserva').forEach(panel => {
        const categoria = panel.dataset.categoriaPanel;
        const seleccionados = gruposDeCategoria(categoria).filter(g => g.seleccionados.length > 0);

        const texto = panel.querySelector('.texto-reserva');
        const totalEl = panel.querySelector('.total-reserva');
        const boton = panel.querySelector('.btn-confirmar');

        // Grupos obligatorios de la categoría que aún no se han elegido
        const faltantes = (obligatoriosPorCategoria[categoria] || []).filter(clave => {
            const g = grupos.find(gr => gr.clave === clave);
            return !g || g.seleccionados.length === 0;
        });

        if (texto) {
            if (seleccionados.length === 0) {
                texto.textContent = faltantes.length
                    ? 'Para comprar debes elegir un Servicio y una Estación.'
                    : 'Selecciona lo que quieras para armar tu combo.';
            } else {
                let mensaje = 'Tu selección: ' + seleccionados
                    .map(g => `${g.etiqueta}: ${g.seleccionados.map(i => i.titulo).join(', ')}`)
                    .join(' + ');

                if (faltantes.length > 0) {
                    const nombres = faltantes.map(clave => {
                        const g = grupos.find(gr => gr.clave === clave);
                        return g ? g.etiqueta : clave;
                    });
                    mensaje += `. Falta elegir: ${nombres.join(' y ')} para poder comprar.`;
                }

                texto.textContent = mensaje;
            }
        }

        if (totalEl) {
            totalEl.textContent = seleccionados.length === 0
                ? ''
                : 'Total: ' + formatearPrecio(totalDeGrupos(seleccionados));
        }

        if (boton) {
            // No se puede comprar sin ítems, ni sin los grupos obligatorios (servicio + estación)
            boton.disabled = seleccionados.length === 0 || faltantes.length > 0;
        }
    });
}

// Al confirmar, la compra queda PENDIENTE de pago y se envía a la pestaña de pago.
// Solo cuando el pago se completa (en pago.js) se guarda en 'reservasZona12',
// que es la lista que ve el administrador. Las compras sin pagar no se cuentan.
function confirmarReserva(panel) {
    const categoria = panel.dataset.categoriaPanel;
    const seleccionados = gruposDeCategoria(categoria).filter(g => g.seleccionados.length > 0);

    const reserva = {
        categoria,
        items: seleccionados.flatMap(g => g.seleccionados.map(item => ({
            tipo: g.etiqueta,
            nombre: item.titulo,
            precio: item.precio || 0,
            sufijo: item.sufijo || ''
        }))),
        usuario: (() => {
            const sesion = JSON.parse(localStorage.getItem('sesionZona12'));
            return sesion ? `${sesion.nombre} (${sesion.email})` : 'Invitado';
        })(),
        fecha: new Date().toLocaleString('es-CO')
    };

    // Guardamos la compra como pendiente de pago (aún no cuenta para el admin)
    localStorage.setItem('pagoPendienteZona12', JSON.stringify(reserva));

    // Limpiamos la selección de esa categoría antes de ir al pago
    gruposDeCategoria(categoria).forEach(g => {
        g.seleccionados = [];
        marcarSeleccion(g);
    });
    actualizarPaneles();

    // Enviamos al usuario a la pestaña de pago
    window.location.href = 'pago.html';
}

// --- Bloqueo del catálogo: usar cualquier función requiere iniciar sesión ---
const catalogo = document.getElementById('catalogo');
const sesionActiva = JSON.parse(localStorage.getItem('sesionZona12'));

if (catalogo && !sesionActiva) {
    catalogo.classList.add('bloqueado');

    // Cualquier clic dentro del catálogo (salvo el enlace de login) envía a iniciar sesión
    catalogo.addEventListener('click', (evento) => {
        if (evento.target.closest('.aviso-catalogo')) return;
        evento.preventDefault();
        evento.stopPropagation();
        window.location.href = 'sesion.html';
    }, true);
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