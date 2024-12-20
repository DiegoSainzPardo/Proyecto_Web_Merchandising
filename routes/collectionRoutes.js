const express                                                      = require('express');
const { createCollection, addElementToCollection, getCollections } = require('../controllers/collectionController');
const authMiddleware                                               = require('../middleware/authMiddleware');
const router                                                       = express.Router();

// Rutas de colecciones
router.post('/',            authMiddleware, createCollection      ); // Crear colección
router.post('/add-element', authMiddleware, addElementToCollection); // Agregar elemento a una colección
router.get ('/',            authMiddleware, getCollections        ); // Obtener todas las colecciones del usuario

module.exports = router;