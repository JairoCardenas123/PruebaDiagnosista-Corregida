// ObtenerMedicamentos.js
const { MongoClient } = require('mongodb');
const { url } = require('../models/Server.js'); // Importa el nombre de la base de datos

const ObtenerMedicamentos = async (req, res) => {
    try {
        const client = new MongoClient(url, { useNewUrlParser: true });
        await client.connect();
        const db = client.db('farmaciaCampus');
        const medicamentosCollection = db.collection('Medicamentos'); // Usa la conexión a la base de datos de Server.js

        // Consulta los medicamentos con stock menor a 50
        const medicamentos = await medicamentosCollection.find({ stock: { $lt: 50 } }).toArray();

        // Envia una respuesta JSON con los medicamentos
        res.json({ medicamentos });
    } catch (error) {
        console.error('Error al obtener el stock:', error);
        // Envía una respuesta de error
        res.status(500).json({ error: 'Error al obtener el stock.' });
    }
};

module.exports = ObtenerMedicamentos;
