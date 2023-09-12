
const express = require("express");
const cors = require("cors");

const obtenerMedicamentos = require('../routes/medicamentos-50.routes.js')




class Server{


    constructor(){
        this.app = express();
        
       this.port = process.env.PORT;
       /*   this.comprasGet = '/api/Compras'
        this.empleadosGet = '/api/Empleados'
        this.pacientesGet = '/api/Pacientes'
        this.proveedoresGet = '/api/Proveedores'
        this.ventasGet = '/api/Ventas'
        this.stockGet = '/api/Medicamentos'
        this.emitidasDespues = '/api/Ventas'
        this.paracetamol = '/api/Ventas' */
        this.medicamentosGet = '/api/Medicamentos'

        // ! Middleware
        this.middlewares();

        // !Routes

        this.routes();


    }

    middlewares(){

        //! Cors
        this.app.use(cors());

        // ? PUBLIC DIRECTORY
        this.app.use(express.static('public'));

        //! EXPRESS JSON
        this.app.use(express.json());

    }

    routes(){
        this.app.use(this.medicamentosGet, obtenerMedicamentos)
    }




    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server: ${this.port} `);
        })
    }
}

module.exports = Server