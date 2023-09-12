const { Router } = require('express');
const obtenerNombresDePacientes = require('../controllers/Pacientes.js');

const router = Router();

router.get('/nombres', obtenerNombresDePacientes);

module.exports = router;
