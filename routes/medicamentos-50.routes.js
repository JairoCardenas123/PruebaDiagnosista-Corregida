const { Router } = require('express');
const obtenerStock = require('../models/Medicamentos.js'); // Asegúrate de que estás importando la función correcta

const router = Router();

// Ruta para obtener el stock de medicamentos
router.get('/stock', obtenerStock);

module.exports = router;
