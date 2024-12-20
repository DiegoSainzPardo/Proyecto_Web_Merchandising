require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Para trabajar con rutas de archivos
const collectionRoutes = require('./routes/collectionRoutes');

const authRoutes = require('./routes/authRoutes');
const elementRoutes = require('./routes/elementRoutes');

const app = express();


// Middlewares
app.use(express.json());
app.use(cors());
app.use('/api/collections', collectionRoutes);

// Rutas para la API
app.use('/api/auth', authRoutes);
app.use('/api/elements', elementRoutes);

// Configura el servidor para servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));  // Aquí "public" es la carpeta donde estarán tus archivos estáticos

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Conectar a MongoDB
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1); // Termina el proceso si no hay conexión
    });
