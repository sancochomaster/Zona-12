# Zona 12 // El Núcleo Gamer de Cali

Sitio web del centro gamer Zona 12: catálogo de equipos, combos y servicios,
formulario de contacto, creación de cuenta, reserva con pago y un panel de
administración.

El proyecto nació como páginas HTML/CSS/JS y hoy está migrado a **React (Vite)**
en el frontend, con una API en **Node.js + Express** y **MongoDB Atlas** como
base de datos.

## Estructura del proyecto

```
Zona-12/
├── backend/          API en Express (puerto 4000)
│   ├── src/
│   │   ├── db/       conexión a MongoDB
│   │   ├── models/   Reserva, Mensaje, Usuario
│   │   └── server.js rutas de la API
│   └── .env.example
├── frontend/         Aplicación en React + Vite (puerto 5173)
│   └── src/
│       ├── api.js        todos los fetch hacia el backend
│       ├── data/         catálogo estático (equipos, combos, precios)
│       ├── utils/        formato de precios
│       └── components/   piezas de la página
├── Zona-12/          páginas HTML originales (versión vanilla, referencia)
└── access/           CSS, imágenes y JS originales (referencia)
```

## Cómo levantar el proyecto

Necesitas **dos terminales** y MongoDB disponible.

```bash
# Terminal 1 · backend (cocina)
cd backend
npm install
copy .env.example .env   # y completa tu MONGODB_URI
npm run dev              # http://localhost:4000

# Terminal 2 · frontend (sala)
cd frontend
npm install
npm run dev              # http://localhost:5173
```

El backend usa la variable `MONGODB_URI` (Atlas o local) y el puerto `PORT`
(4000 por defecto). El frontend usa `VITE_API_URL` y, si no existe, apunta a
`http://localhost:4000`.

## Páginas

Es una aplicación de una sola página que cambia de "vista" con estado de React
(todavía sin React Router):

- **Inicio** — hero, contador de GTA 6 y catálogo con filtros y carrito.
- **Contacto** — formulario que guarda mensajes en MongoDB.
- **Mi Cuenta** — registro e inicio de sesión, e historial de compras.
- **Administrador** — panel con pestañas (mensajes / compras). Acceso: `admin` / `1234`.
- **Pago** — resumen de la compra y formulario de tarjeta.

## API (backend)

| Método | Ruta                     | Para qué                          |
| ------ | ------------------------ | --------------------------------- |
| GET    | `/api/mensajes`          | Lista los mensajes de contacto    |
| POST   | `/api/mensajes`          | Guarda un mensaje de contacto     |
| GET    | `/api/reservas`          | Lista las compras (opcional `?email=`) |
| POST   | `/api/reservas`          | Registra una compra pagada        |
| POST   | `/api/usuarios/registro` | Crea una cuenta                   |
| POST   | `/api/usuarios/login`    | Inicia sesión                     |

## Tecnologías

- **Frontend:** React 19, Vite, JavaScript, Oxlint.
- **Backend:** Node.js, Express, Mongoose.
- **Base de datos:** MongoDB Atlas.
