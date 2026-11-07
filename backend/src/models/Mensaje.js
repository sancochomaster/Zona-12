// Modelo de los mensajes enviados desde el formulario de contacto.

const mongoose = require('mongoose');

const MensajeSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    mensaje: { type: String, default: 'Sin mensaje' },
    fecha: { type: String }
});

module.exports = mongoose.model('Mensaje', MensajeSchema);
