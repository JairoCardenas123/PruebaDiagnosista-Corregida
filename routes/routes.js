const express = require('express');
const {MongoClient} = require('mongodb');

require('dotenv').config();
const router = express.Router();

const bases = process.env.DDBB
const nombreBase = 'farmaciaCampus'
const monguito = require('mongodb').MongoClient;

router.get('/endpoint1',async(req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const medicamentosCollection = db.collection('Medicamentos'); 
        const medicamentos = await medicamentosCollection.find({ stock: { $lt: 50 } }).toArray();
        res.json({ medicamentos });
    } catch (error) {
        console.error('Error al obtener el stock:', error);
        res.status(500).json({ error: 'Error al obtener el stock.' });
    }
})


router.get('/endpoint2', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const medicamentosCollection = db.collection('Medicamentos');
        const proveedoresNombres = await medicamentosCollection.distinct('proveedor.nombre');
        const proveedores = [];
        for (const nombreProveedor of proveedoresNombres) {
            const proveedorInfo = await medicamentosCollection.findOne({ 'proveedor.nombre': nombreProveedor }, { projection: { 'proveedor.contacto': 1 } });
            if (proveedorInfo) {
                proveedores.push({
                    nombre: nombreProveedor,
                    contacto: proveedorInfo.proveedor.contacto
                });
            }
        }

        res.json({ proveedores });
    } catch (error) {
        console.error('Error al obtener los proveedores:', error);
        res.status(500).json({ error: 'Error al obtener los proveedores.' });
    }
})

router.get('/endpoint26', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const ventasCollection = db.collection('Ventas'); 
        const startDate = new Date('2023-01-01T00:00:00.000+00:00');
        const endDate = new Date('2023-12-31T23:59:59.999+00:00');
        const query = {
            fechaVenta: {
                $gte: startDate,
                $lte: endDate,
            },
        }
        const ventasEn2023 = await ventasCollection.find(query).toArray();
        let totalMedicamentosVendidos = 0;
        ventasEn2023.forEach((venta) => {
            venta.medicamentosVendidos.forEach((medicamento) => {
                totalMedicamentosVendidos += medicamento.cantidadVendida;
            });
        });
        res.json({ totalMedicamentosVendidos });
    } catch (error) {
        console.error('Error al calcular el total de medicamentos vendidos en 2023:', error);
        res.status(500).json({ error: 'Error al calcular el total de medicamentos vendidos en 2023.' });
    }
});

router.get('/endpoint27', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const ventasCollection = db.collection('Ventas'); 
        const ventas2023 = await ventasCollection.find({
            fechaVenta: {
                $gte: new Date('2023-01-01T00:00:00.000+00:00'),
                $lte: new Date('2023-12-31T23:59:59.999+00:00')
            }
        }).toArray();
        const ventasPorEmpleado = {};
        ventas2023.forEach((venta) => {
            const empleadoNombre = venta.empleado.nombre;

            if (ventasPorEmpleado[empleadoNombre]) {
                ventasPorEmpleado[empleadoNombre]++;
            } else {
                ventasPorEmpleado[empleadoNombre] = 1;
            }
        });
        const empleadosConMenosDe5Ventas = Object.keys(ventasPorEmpleado).filter((empleado) => ventasPorEmpleado[empleado] < 5);
        client.close();
        res.json({ empleadosConMenosDe5Ventas });
    } catch (error) {
        console.error('Error al obtener los empleados con menos de 5 ventas en 2023:', error);
        res.status(500).json({ error: 'Error al obtener los empleados con menos de 5 ventas en 2023.' });
    }
});

router.get('/endpoint28', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const comprasCollection = db.collection('Compras'); // Cambia el nombre de la colección si es diferente
        const proveedores = await comprasCollection.find({
            fechaCompra: { $gte: new Date('2023-01-01T00:00:00.000+00:00') }
        }).toArray();

        const totalProveedores = new Set(proveedores.map((compra) => compra.proveedor.nombre)).size;

        res.json({ totalProveedores });
    } catch (error) {
        console.error('Error al obtener el número total de proveedores:', error);
        res.status(500).json({ error: 'Error al obtener el número total de proveedores.' });
    }
});









module.exports = router



