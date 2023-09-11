const {Router} = require('express')
const obtenerStock = require('../models/Medicamentos.js')

const router = Router()

router.get('/stock', obtenerStock);

module.exports = router;
