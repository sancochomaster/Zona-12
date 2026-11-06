// Funciones de formato reutilizadas en toda la página.

// Convierte 1500 en "$1.500" (formato de pesos colombianos)
export const formatearPrecio = (valor) => '$' + Number(valor).toLocaleString('es-CO');

// Convierte 7 en "07" (para el contador de GTA 6)
export const dosDigitos = (numero) => String(numero).padStart(2, '0');
