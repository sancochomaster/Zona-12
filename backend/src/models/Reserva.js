// Modelo de las compras/reservas hechas en el catálogo.
// Solo se guardan aquí las compras con el pago completado (pagado: true).

const mongoose = require('mongoose');

// Cada ítem de la compra (servicio, estación, bebida o snack)
const ItemSchema = new mongoose.Schema({
    tipo: { type: String, required: true },
    nombre: { type: String, required: true },
    precio: { type: Number, default: 0 },
    sufijo: { type: String, default: '' }
}, { _id: false });

const ReservaSchema = new mongoose.Schema({
    categoria: { type: String, required: true },
    items: [ItemSchema],
    usuario: { type: String, default: 'Invitado' },
    fecha: { type: String },
    pagado: { type: Boolean, default: true }
});

module.exports = mongoose.model('Reserva', ReservaSchema);
