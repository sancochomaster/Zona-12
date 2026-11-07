// api.js — el ÚNICO lugar donde el frontend habla con el backend (Express + MongoDB).
// Todos los fetch viven aquí para que los componentes solo llamen funciones claras.

// Dirección del servidor backend. Se puede cambiar con VITE_API_URL en un archivo .env,
// y si no existe, usa el puerto por defecto (4000).
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// Función interna que hace el fetch, revisa si la respuesta fue correcta
// y lanza un error legible cuando algo sale mal.
async function pedir(ruta, opciones = {}) {
  let respuesta
  try {
    respuesta = await fetch(API + ruta, opciones)
  } catch {
    throw new Error('No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.')
  }

  const datos = await respuesta.json().catch(() => null)

  if (!respuesta.ok) {
    throw new Error((datos && datos.error) || 'El servidor respondió con un error.')
  }

  return datos
}

// Atajo para enviar JSON en las peticiones POST.
function comoJSON(cuerpo) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
  }
}

// ---------- Mensajes de contacto ----------

export function obtenerMensajes() {
  return pedir('/api/mensajes')
}

export function enviarMensaje(mensaje) {
  return pedir('/api/mensajes', comoJSON(mensaje))
}

// ---------- Usuarios (registro / login) ----------

export function registrarUsuario(datos) {
  return pedir('/api/usuarios/registro', comoJSON(datos))
}

export function ingresarUsuario(datos) {
  return pedir('/api/usuarios/login', comoJSON(datos))
}

// ---------- Compras / reservas ----------

export function obtenerReservas() {
  return pedir('/api/reservas')
}

export function obtenerReservasDe(email) {
  return pedir('/api/reservas?email=' + encodeURIComponent(email))
}

export function crearReserva(reserva) {
  return pedir('/api/reservas', comoJSON(reserva))
}
