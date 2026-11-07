// Datos del catálogo de Zona 12.
// Son los mismos datos que estaban escritos en access/js/catalogo.js del
// proyecto vanilla. El catálogo es contenido fijo de la página: nunca estuvo
// guardado en la base de datos, por eso vive aquí. Lo que sí viene de MongoDB
// (a través de la API) son los mensajes, las compras y los usuarios.

// --- Servicios de PC ---
export const serviciosPC = [
    { id: 'sp-1', titulo: 'Alquiler por Hora (PC Gamer)', detalle: 'Acceso a computadores de alta gama con monitores de 144Hz para juego competitivo y casual.', precio: 1500, sufijo: '/ hora' },
    { id: 'sp-2', titulo: 'Pase Libre Universitario', detalle: 'Uso de PC para trabajos académicos, internet de alta velocidad e impresiones.', precio: 20000, sufijo: '/ día' },
    { id: 'sp-3', titulo: 'Streaming & Content Room', detalle: 'Espacio equipado con cámara, micrófono profesional y PC para transmitir en vivo.', precio: 3000, sufijo: '/ hora' }
];

// --- Estaciones de PC (con estado Disponible / Ocupada) ---
export const computadoras = [
    { id: 'pc-1', titulo: 'PC #01', estado: 'Disponible', precio: 500, specs: [{ etiqueta: 'GPU', valor: 'RTX 4060' }, { etiqueta: 'CPU', valor: 'Ryzen 5 5600X' }, { etiqueta: 'RAM', valor: '16 GB' }, { etiqueta: 'Monitor', valor: '144 Hz' }] },
    { id: 'pc-2', titulo: 'PC #02', estado: 'Disponible', precio: 500, specs: [{ etiqueta: 'GPU', valor: 'RTX 4070' }, { etiqueta: 'CPU', valor: 'Ryzen 7 5800X' }, { etiqueta: 'RAM', valor: '32 GB' }, { etiqueta: 'Monitor', valor: '165 Hz' }] },
    { id: 'pc-3', titulo: 'PC #03', estado: 'Ocupada', precio: 500, specs: [{ etiqueta: 'GPU', valor: 'RTX 3080' }, { etiqueta: 'CPU', valor: 'Intel i7-12700K' }, { etiqueta: 'RAM', valor: '32 GB' }, { etiqueta: 'Monitor', valor: '240 Hz' }] },
    { id: 'pc-4', titulo: 'PC #04', estado: 'Disponible', precio: 600, specs: [{ etiqueta: 'GPU', valor: 'RTX 4090' }, { etiqueta: 'CPU', valor: 'Intel i9-13900K' }, { etiqueta: 'RAM', valor: '64 GB' }, { etiqueta: 'Monitor', valor: '360 Hz' }] },
    { id: 'pc-5', titulo: 'PC #05', estado: 'Ocupada', precio: 500, specs: [{ etiqueta: 'GPU', valor: 'RTX 3060' }, { etiqueta: 'CPU', valor: 'Ryzen 5 3600' }, { etiqueta: 'RAM', valor: '16 GB' }, { etiqueta: 'Monitor', valor: '144 Hz' }] },
    { id: 'pc-6', titulo: 'PC #06', estado: 'Disponible', precio: 500, specs: [{ etiqueta: 'GPU', valor: 'RTX 4060' }, { etiqueta: 'CPU', valor: 'Ryzen 5 5600X' }, { etiqueta: 'RAM', valor: '16 GB' }, { etiqueta: 'Monitor', valor: '144 Hz' }] },
    { id: 'pc-7', titulo: 'PC #07', estado: 'Disponible', precio: 500, specs: [{ etiqueta: 'GPU', valor: 'RTX 4070' }, { etiqueta: 'CPU', valor: 'Ryzen 7 5800X' }, { etiqueta: 'RAM', valor: '32 GB' }, { etiqueta: 'Monitor', valor: '165 Hz' }] },
    { id: 'pc-8', titulo: 'PC #08', estado: 'Disponible', precio: 500, specs: [{ etiqueta: 'GPU', valor: 'RTX 3060 Ti' }, { etiqueta: 'CPU', valor: 'Intel i5-12400' }, { etiqueta: 'RAM', valor: '16 GB' }, { etiqueta: 'Monitor', valor: '144 Hz' }] },
    { id: 'pc-9', titulo: 'PC #09', estado: 'Disponible', precio: 600, specs: [{ etiqueta: 'GPU', valor: 'RTX 4080' }, { etiqueta: 'CPU', valor: 'Ryzen 9 7900X' }, { etiqueta: 'RAM', valor: '32 GB' }, { etiqueta: 'Monitor', valor: '240 Hz' }] },
    { id: 'pc-10', titulo: 'PC #10', estado: 'Disponible', precio: 500, specs: [{ etiqueta: 'GPU', valor: 'RTX 3070' }, { etiqueta: 'CPU', valor: 'Ryzen 7 5700X' }, { etiqueta: 'RAM', valor: '16 GB' }, { etiqueta: 'Monitor', valor: '144 Hz' }] }
];

// --- Estaciones de consola ---
export const consolas = [
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

// --- Servicios y torneos de consola ---
export const serviciosConsola = [
    { id: 'sc-0', titulo: 'Alquiler por Hora (Consola)', detalle: 'Uso individual de consola con un mando incluido.', precio: 1500, sufijo: '/ hora' },
    { id: 'sc-1', titulo: 'Zona Multiplayer (4 Controles)', detalle: 'Ideal para jugar en grupo títulos locales de peleas, deportes o carreras.', precio: 500, sufijo: '/ hora por persona' },
    { id: 'sc-2', titulo: 'Torneos y Competencias', detalle: 'Inscripción a torneos semanales con premios y acceso a la consola de competencia.', precio: 600, sufijo: '/ evento' }
];

// --- Bebidas (solo se puede elegir una) ---
export const bebidas = [
    { id: 'be-1', titulo: 'Gaseosa', precio: 4500 },
    { id: 'be-2', titulo: 'Café', precio: 3500 },
    { id: 'be-3', titulo: 'Botella de Agua', precio: 2000 }
];

// --- Snacks (se pueden elegir varios) ---
export const snacks = [
    { id: 'sn-1', titulo: 'Maní', precio: 3000 },
    { id: 'sn-2', titulo: 'Papas Fritas', precio: 4000 },
    { id: 'sn-3', titulo: 'Chocolatina', precio: 2500 }
];

// --- Combos (paquetes con precio especial; se elige UNO) ---
export const combos = [
    { id: 'cb-1', titulo: 'Combo Gamer PC', detalle: '2 horas de PC Gamer + Gaseosa + Papas Fritas.', precio: 9500, sufijo: '/ combo' },
    { id: 'cb-2', titulo: 'Combo Universitario', detalle: 'Pase Libre Universitario + Café + Chocolatina.', precio: 23000, sufijo: '/ combo' },
    { id: 'cb-3', titulo: 'Combo Dúo Consola', detalle: '2 horas de consola + 2 Bebidas + Maní para compartir.', precio: 12500, sufijo: '/ combo' },
    { id: 'cb-4', titulo: 'Combo Squad Multiplayer', detalle: 'Zona Multiplayer (4 controles) por 1 hora + 4 Gaseosas + 2 Papas Fritas.', precio: 24000, sufijo: '/ combo' }
];

// --- Noticias gamer aleatorias del inicio ---
export const noticiasGamer = [
    { id: 'n-1', titulo: 'Los esports siguen creciendo en Latinoamérica', texto: 'Cada vez más torneos regionales de videojuegos reúnen a equipos y público en ciudades como Bogotá, Medellín y Cali.' },
    { id: 'n-2', titulo: 'Nuevos juegos indie que debes probar', texto: 'El catálogo indie no deja de sorprender con propuestas creativas de estudio pequeños que se vuelven virales.' },
    { id: 'n-3', titulo: 'Las tarjetas gráficas RTX marcan la pauta', texto: 'El ray tracing y el alto rendimiento en 4K se volvieron el estándar para los jugadores de PC más exigentes.' },
    { id: 'n-4', titulo: 'Los remakes nostálgicos vuelven con fuerza', texto: 'Los clásicos de los 80 y 90 regresan con gráficos modernos, conquistando a veteranos y a nuevas generaciones.' },
    { id: 'n-5', titulo: 'Nuevos computadores han llegado!', texto: 'La nueva ola de computadores ha llegado a zona 12' },
    { id: 'n-6', titulo: 'El gaming móvil no se detiene', texto: 'Millones de jugadores ya compiten desde el celular, y los torneos móviles ganan cada vez más premios.' }
];

// --- Categorías del catálogo y sus grupos de tarjetas ---
// 'requiere' = claves de otros grupos que deben estar elegidas antes.
// 'multiple' = se pueden elegir varios ítems (snacks).
// 'esEstacion' = se dibuja con el diseño de monitor (PC / consola).
export const categorias = [
    {
        clave: 'computadoras',
        titulo: 'Computadoras',
        grupos: [
            { clave: 'servicioPC', titulo: 'Servicios de PC', etiqueta: 'Servicio', items: serviciosPC },
            { clave: 'pc', titulo: 'Estaciones de PC', etiqueta: 'PC', items: computadoras, esEstacion: true },
            { clave: 'bebidaPc', titulo: 'Bebidas', etiqueta: 'Bebida', items: bebidas, requiere: ['servicioPC', 'pc'], aviso: 'Para elegir una bebida primero debes seleccionar un Servicio de PC y una PC.' },
            { clave: 'snackPc', titulo: 'Snacks', etiqueta: 'Snack', items: snacks, requiere: ['servicioPC', 'pc'], multiple: true, aviso: 'Para elegir snacks primero debes seleccionar un Servicio de PC y una PC.' }
        ],
        obligatorios: ['servicioPC', 'pc']
    },
    {
        clave: 'consolas',
        titulo: 'Consolas',
        grupos: [
            { clave: 'servicioConsola', titulo: 'Servicios y Torneos', etiqueta: 'Servicio', items: serviciosConsola },
            { clave: 'estacionConsola', titulo: 'Estaciones de Consola', etiqueta: 'Estación', items: consolas, esEstacion: true },
            { clave: 'bebidaConsola', titulo: 'Bebidas', etiqueta: 'Bebida', items: bebidas, requiere: ['servicioConsola', 'estacionConsola'], aviso: 'Para elegir una bebida primero debes seleccionar un Servicio de Consola y una Estación de Consola.' },
            { clave: 'snackConsola', titulo: 'Snacks', etiqueta: 'Snack', items: snacks, requiere: ['servicioConsola', 'estacionConsola'], multiple: true, aviso: 'Para elegir snacks primero debes seleccionar un Servicio de Consola y una Estación de Consola.' }
        ],
        obligatorios: ['servicioConsola', 'estacionConsola']
    }
];

// --- Grupo de combos (categoría propia) ---
export const grupoCombos = { clave: 'combo', etiqueta: 'Combo', items: combos };

// --- Fecha de lanzamiento para el contador de GTA 6 ---
export const fechaGTA6 = '2026-11-19T00:00:00';
