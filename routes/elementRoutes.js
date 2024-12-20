const express                                                      = require('express');
const { createElement, getElements, deleteElement, updateElement } = require('../controllers/elementController');
const authMiddleware                                               = require('../middleware/authMiddleware');
const router                                                       = express.Router();

// Rutas de elementos
router.post  ('/',    authMiddleware, createElement);
router.get   ('/',    authMiddleware, getElements  );     // Ahora filtra por colección
router.delete('/:id', authMiddleware, deleteElement);
router.put   ('/:id', authMiddleware, updateElement);

module.exports = router;