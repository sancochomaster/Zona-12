// Conexión a la base de datos MongoDB Atlas del proyecto Zona 12.
// La URL se lee de la variable de entorno MONGODB_URI (archivo .env) para no
// dejar la credencial escrita dentro del código.

const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

async function conectarDB() {
    try {
        if (!URI) {
            throw new Error('Falta la variable MONGODB_URI en el archivo .env');
        }
        await mongoose.connect(URI);
        console.log('Base de datos conectada: zona12');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.message);
    }
}

module.exports = conectarDB;
