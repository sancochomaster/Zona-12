const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const conectarDB = require('./db/conexion');
const Reserva = require('./models/Reserva');
const Mensaje = require('./models/Mensaje');
const Usuario = require('./models/Usuario');

const app = express();
const PUERTO = process.env.PORT || 4000;

// Permite leer JSON en el cuerpo de las peticiones (las de la API)
app.use(express.json());

// Orígenes autorizados para consultar la API: el frontend en local (Vite) y el
// sitio publicado en GitHub Pages. Se puede sumar otro dominio con FRONTEND_URL.
const origenesPermitidos = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://sancochomaster.github.io',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({ origin: origenesPermitidos }));

// Cifra una contraseña para no guardarla en texto plano
const cifrar = (texto) => crypto.createHash('sha256').update(texto).digest('hex');

// ---------- API: MENSAJES DE CONTACTO ----------

app.get('/api/mensajes', async (req, res) => {
    try {
        const mensajes = await Mensaje.find().sort({ _id: -1 });
        res.json(mensajes);
    } catch (error) {
        res.status(500).json({ error: 'No se pudieron leer los mensajes.' });
    }
});

app.post('/api/mensajes', async (req, res) => {
    try {
        const { nombre, email, mensaje } = req.body;
        if (!nombre || !email) {
            return res.status(400).json({ error: 'Faltan nombre o correo.' });
        }
        const nuevo = await Mensaje.create({
            nombre,
            email,
            mensaje: mensaje || 'Sin mensaje',
            fecha: new Date().toLocaleDateString('es-CO')
        });
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo guardar el mensaje.' });
    }
});

// ---------- API: COMPRAS / RESERVAS ----------

// Lista las compras pagadas. Si llega ?email=... filtra las de ese usuario.
app.get('/api/reservas', async (req, res) => {
    try {
        const { email } = req.query;
        let reservas = await Reserva.find({ pagado: true }).sort({ _id: -1 });
        if (email) {
            reservas = reservas.filter(r => r.usuario && r.usuario.includes(email));
        }
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'No se pudieron leer las compras.' });
    }
});

// Registra una compra ya pagada (esto es lo que ve el administrador)
app.post('/api/reservas', async (req, res) => {
    try {
        const { categoria, items, usuario, fecha } = req.body;
        if (!categoria || !Array.isArray(items)) {
            return res.status(400).json({ error: 'Compra inválida.' });
        }
        const nueva = await Reserva.create({
            categoria,
            items,
            usuario: usuario || 'Invitado',
            fecha: fecha || new Date().toLocaleString('es-CO'),
            pagado: true
        });
        res.status(201).json(nueva);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo registrar la compra.' });
    }
});

// ---------- API: USUARIOS ----------

app.post('/api/usuarios/registro', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        if (!nombre || !email || !password) {
            return res.status(400).json({ error: 'Faltan datos para el registro.' });
        }
        const correo = email.trim().toLowerCase();

        const existe = await Usuario.findOne({ email: correo });
        if (existe) {
            return res.status(409).json({ error: 'Ya existe una cuenta con ese correo.' });
        }

        const usuario = await Usuario.create({
            nombre,
            email: correo,
            clave: cifrar(password),
            fecha: new Date().toLocaleDateString('es-CO')
        });
        res.status(201).json({ nombre: usuario.nombre, email: usuario.email });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo crear la cuenta.' });
    }
});

app.post('/api/usuarios/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Faltan correo o contraseña.' });
        }
        const usuario = await Usuario.findOne({
            email: email.trim().toLowerCase(),
            clave: cifrar(password)
        });
        if (!usuario) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
        }
        res.json({ nombre: usuario.nombre, email: usuario.email });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo iniciar sesión.' });
    }
});

// Levantamos el servidor primero y luego conectamos la base de datos: así Render
// detecta el puerto abierto de inmediato y no falla por "port scan timeout"
// cuando MongoDB tarda en responder.
app.listen(PUERTO, () => {
    console.log(`Servidor Zona 12 corriendo en http://localhost:${PUERTO}`);
});

conectarDB();
