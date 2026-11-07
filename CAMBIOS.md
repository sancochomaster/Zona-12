# CAMBIOS — Resumen de la migración a React

Este archivo resume qué se hizo en cada fase de la migración (de HTML/JS vanilla
a React + Vite) y las cosas que conviene tener en cuenta.

## Fases de la migración

| Fase | Qué se hizo | Commit |
| ---- | ----------- | ------ |
| 0 | Análisis del proyecto: se decidió **mantener las 5 páginas**, **seguir con MongoDB Atlas** y trabajar en **modo directo**. | — |
| 1 | La API (Express) se movió a la carpeta `backend/`. | `refactor: mover API a carpeta backend` |
| 2 | Se creó el frontend con **Vite + React** en `frontend/`. | `chore: crear frontend con Vite + React` |
| 3 | El HTML se dividió en **componentes** de React (todavía sin clics). | `feat: componentes de la página en React` |
| 4 | Interactividad con `useState`: menú, filtros, carrito, contador GTA 6 y formularios. | `feat: interactividad con useState` |
| 5 | Todos los `fetch` se centralizaron en `frontend/src/api.js`, con estados de cargando y error. | `feat: frontend conectado a la API` |
| 6 | Cierre: `.gitignore`, `README.md`, `CAMBIOS.md` y verificación de `build` / `lint`. | `docs: README y resumen de la migración` |

## Qué cambió frente a la versión vanilla

- **Navegación:** ya no hay 5 archivos HTML separados. Es una sola aplicación
  (SPA) donde una variable de estado en `App.jsx` decide qué vista se muestra.
  (React Router todavía no: eso es tema de la Sesión 18.)
- **Antes:** se manipulaba el DOM con `querySelector`, `innerHTML` y
  `addEventListener`. **Ahora:** todo se maneja con `useState`, props y `onClick`.
- **Datos:** los mensajes, usuarios y compras van a MongoDB por medio del
  backend. El **catálogo** (equipos, combos y precios) sigue siendo estático en
  `frontend/src/data/catalogo.js`.
- **Peticiones:** todos los `fetch` viven en `frontend/src/api.js`; los
  componentes solo llaman funciones como `enviarMensaje` o `crearReserva`.
- **Sesión:** se guarda en `localStorage` con la clave `sesionZona12`.
- **Pago:** la compra pendiente se guarda en `localStorage` con la clave
  `pagoPendienteZona12` y solo se registra en la base de datos al pagar.

## Cosas a tener en cuenta

- **El backend debe estar encendido** (puerto 4000) para que funcionen contacto,
  login, historial de compras y el panel del administrador.
- **Catálogo estático:** el backend no tiene un endpoint de productos, por eso
  los equipos y precios están en `frontend/src/data/catalogo.js` y no en MongoDB.
- **Aviso de lint intencional:** `npm run lint` deja 1 aviso en
  `src/components/Categoria.jsx` (`react/set-state-in-effect`). Es a propósito:
  sirve para disparar la animación de entrada de cada categoría. **0 errores.**
- **Acceso admin:** usuario `admin`, contraseña `1234` (igual que en la versión
  original).
- **Carpetas `Zona-12/` y `access/`:** se conservan como referencia de la
  versión vanilla; no son parte de la app en React.
- **El puerto de Vite** puede mostrarse como 5174 si el 5173 está ocupado; el
  backend permite ambos orígenes por CORS.
