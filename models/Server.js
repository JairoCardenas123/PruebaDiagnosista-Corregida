// Server.js
const express = require("express");
const cors = require("cors");

const obtenerMedicamentos = require('../routes/medicamentos-50.routes.js')
const { MongoClient } = require('mongodb'); // Importa MongoClient

const url = 'mongodb+srv://pruebadiagnostica:pruebadiagnostica@pruebadiagnosticacluste.ontcust.mongodb.net/farmaciaCampus';
const dbName = 'farmaciaCampus';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        // Middleware y rutas
        this.middlewares();
        this.routes();
        this.connectToDatabase(); // Llama a la función de conexión a la base de datos
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/Medicamentos', obtenerMedicamentos);
    }

    connectToDatabase() {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            if (err) {
                console.error('Error al conectar a la base de datos:', err);
            } else {
                console.log('Conexión exitosa a la base de datos');
                this.db = client.db(dbName); // Almacena la conexión a la base de datos en this.db
            }
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}

module.exports = {
    url,
    Server

};
