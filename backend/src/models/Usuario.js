// Modelo de los usuarios registrados en Zona 12.
// La contraseña se guarda cifrada (hash SHA-256), nunca en texto plano.

const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    clave: { type: String, required: true },
    fecha: { type: String }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
