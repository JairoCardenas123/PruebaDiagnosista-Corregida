const { Router } = require('express');
const obtenerNombresDePacientes = require('../controllers/pacientes.controllers.js');

const router = Router();

router.get('/nombres', obtenerNombresDePacientes);

module.exports = router;
