const express = require('express');
const {MongoClient} = require('mongodb');

require('dotenv').config();
const router = express.Router();

const bases = process.env.DDBB
const nombreBase = 'farmaciaCampus'
const monguito = require('mongodb').MongoClient;


//1.Obtener todos los medicamentos con menos de 50 unidades en stock.

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

//2.Listar los proveedores con su información de contacto en medicamentos.

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

//3.Medicamentos comprados al ‘Proveedor A’.

router.get('/endpoint3', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const medicamentosCollection = db.collection('Medicamentos'); 
        const medicamentosProveedorA = await medicamentosCollection.find({ 'proveedor.nombre': 'ProveedorA' }).toArray();
        const nombresMedicamentos = medicamentosProveedorA.map(medicamento => medicamento.nombre);
        res.json({ medicamentosProveedorA: nombresMedicamentos });
    } catch (error) {
        console.error('Error al obtener los medicamentos de ProveedorA:', error);
        res.status(500).json({ error: 'Error al obtener los medicamentos de ProveedorA.' });
    }
});

//4.Obtener recetas médicas emitidas después del 1 de enero de 2023.

router.get('/endpoint4', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const recetasCollection = db.collection('Ventas'); 
        const fechaLimite = new Date('2023-01-01T00:00:00.000+00:00');
        const recetasDespuesDe2023 = await recetasCollection.find({
            fechaVenta: { $gt: fechaLimite }
        }).toArray();

        res.json({ recetasDespuesDe2023 });
    } catch (error) {
        console.error('Error al obtener recetas emitidas después de 2023-01-01:', error);
        res.status(500).json({ error: 'Error al obtener recetas emitidas después de 2023-01-01.' });
    }
});

//5.Total de ventas del medicamento ‘Paracetamol’.

router.get('/endpoint5', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const ventasCollection = db.collection('Ventas'); 
        const medicamentoBuscado = 'Paracetamol'; 

        let totalVentasParacetamol = 0;

        const ventas = await ventasCollection.find({}).toArray();

        ventas.forEach((venta) => {
            venta.medicamentosVendidos.forEach((medicamento) => {
                if (medicamento.nombreMedicamento === medicamentoBuscado) {
                    totalVentasParacetamol += medicamento.cantidadVendida;
                }
            });
        });

        res.json({ totalVentasParacetamol });
    } catch (error) {
        console.error('Error al obtener el total de ventas de Paracetamol:', error);
        res.status(500).json({ error: 'Error al obtener el total de ventas de Paracetamol.' });
    }
});

//6.Medicamentos que caducan antes del 1 de enero de 2024.

router.get('/endpoint6', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const medicamentosCollection = db.collection('Medicamentos'); 
        const medicamentos = await medicamentosCollection.find({}).toArray();
        const medicamentosExpirados = medicamentos.filter(medicamento => {
            const fechaExpiracion = new Date(medicamento.fechaExpiracion);
            return fechaExpiracion < new Date('2024-01-01');
        });
        const nombresMedicamentosExpirados = medicamentosExpirados.map(medicamento => medicamento.nombre);

        res.json({ nombresMedicamentosExpirados });
    } catch (error) {
        console.error('Error al obtener los medicamentos expirados:', error);
        res.status(500).json({ error: 'Error al obtener los medicamentos expirados.' });
    }
});

//7.Total de medicamentos vendidos por cada proveedor.

router.get('/endpoint7', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const ventasCollection = db.collection('Ventas'); 
        const ventas = await ventasCollection.find({}).toArray();
        const totalMedicamentosPorProveedor = {};
        ventas.forEach(venta => {
            const medicamentosVendidos = venta.medicamentosVendidos;
            medicamentosVendidos.forEach(medicamento => {
                const nombreProveedor = venta.empleado.nombre;
                const nombreMedicamento = medicamento.nombreMedicamento;
                const cantidadVendida = medicamento.cantidadVendida;

                if (!totalMedicamentosPorProveedor[nombreProveedor]) {
                    totalMedicamentosPorProveedor[nombreProveedor] = {};
                }

                if (!totalMedicamentosPorProveedor[nombreProveedor][nombreMedicamento]) {
                    totalMedicamentosPorProveedor[nombreProveedor][nombreMedicamento] = 0;
                }
                totalMedicamentosPorProveedor[nombreProveedor][nombreMedicamento] += cantidadVendida;
            });
        });

        res.json(totalMedicamentosPorProveedor);
    } catch (error) {
        console.error('Error al obtener el total de medicamentos por proveedor:', error);
        res.status(500).json({ error: 'Error al obtener el total de medicamentos por proveedor.' });
    }
});

//8.Cantidad total de dinero recaudado por las ventas de medicamentos.

router.get('/endpoint8', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const ventasCollection = db.collection('Ventas'); 

        // Consulta para obtener todas las ventas
        const ventas = await ventasCollection.find({}).toArray();

        // Inicializar la suma de precios
        let totalPrecioMedicamentos = 0;

        // Recorremos las ventas
        ventas.forEach(venta => {
            const medicamentosVendidos = venta.medicamentosVendidos;
            medicamentosVendidos.forEach(medicamento => {
                const precio = medicamento.precio;
                totalPrecioMedicamentos += precio;
            });
        });

        res.json({ totalPrecioMedicamentos });
    } catch (error) {
        console.error('Error al obtener el total de precios de medicamentos:', error);
        res.status(500).json({ error: 'Error al obtener el total de precios de medicamentos.' });
    }
});

//9.Medicamentos que no han sido vendidos.

router.get('/endpoint9', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const medicamentosCollection = db.collection('Medicamentos'); 
        const ventasCollection = db.collection('Ventas'); 

        const medicamentos = await medicamentosCollection.find({}).toArray();

        const medicamentosVendidos = await ventasCollection.distinct('medicamentosVendidos.nombreMedicamento');

        const medicamentosNoVendidos = medicamentos.filter(medicamento => !medicamentosVendidos.includes(medicamento.nombre));

        res.json({ medicamentosNoVendidos });
    } catch (error) {
        console.error('Error al obtener los medicamentos no vendidos:', error);
        res.status(500).json({ error: 'Error al obtener los medicamentos no vendidos.' });
    }
});

//10.Obtener el medicamento más caro.

router.get('/endpoint10', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const medicamentosCollection = db.collection('Medicamentos');
        
        const medicamentos = await medicamentosCollection.find({}).toArray();
        
        let medicamentoMasCaro = null;
        let precioMasAlto = 0;
        
        for (const medicamento of medicamentos) {
            if (medicamento.precio > precioMasAlto) {
                medicamentoMasCaro = medicamento;
                precioMasAlto = medicamento.precio;
            }
        }
        
        if (medicamentoMasCaro) {
            res.json({ medicamentoMasCaro });
        } else {
            res.json({ mensaje: 'No se encontraron medicamentos.' });
        }
        
        client.close();
    } catch (error) {
        console.error('Error al obtener el medicamento más caro:', error);
        res.status(500).json({ error: 'Error al obtener el medicamento más caro.' });
    }
});

//11.Número de medicamentos por proveedor.

router.get('/endpoint11', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const medicamentosCollection = db.collection('Medicamentos');
        
        // Obtén todos los medicamentos de la colección
        const medicamentos = await medicamentosCollection.find({}).toArray();
        
        // Mapea los medicamentos para obtener nombre y stock
        const medicamentosInfo = medicamentos.map(medicamento => ({
            nombre: medicamento.nombre,
            stock: medicamento.stock,
            proveedor: medicamento.proveedor.nombre,
        }));
        
        res.json({ medicamentos: medicamentosInfo });
        
        // Cierra la conexión a la base de datos
        client.close();
    } catch (error) {
        console.error('Error al obtener la información de medicamentos:', error);
        res.status(500).json({ error: 'Error al obtener la información de medicamentos.' });
    }
});

//12.Pacientes que han comprado Paracetamol.

router.get("/endpoint12", async (req, res) => {
    try {
      const {buy} = req.query
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db(nombreBase);
      const colection = db.collection("Compras");
  
      const projection = { medicamentosComprados: 1 };
  
      const resultA = await colection
        .find({ "proveedor.nombre": "ProveedorA" })
        .project(projection)
        .toArray();
      const resultB = await colection
        .find({ "proveedor.nombre": "ProveedorB" })
        .project(projection)
        .toArray();
      const resultC = await colection
        .find({ "proveedor.nombre": "ProveedorC" })
        .project(projection)
        .toArray();
  
      res.json({
        ProveedorA: resultA,
        ProveedorB: resultB,
        ProveedorC: resultC,
      });
      client.close();
    } catch (error) {
      console.log(error);
      res.status(404).json("No se reconoce el dato");
    }
  });


//13.Proveedores que no han vendido medicamentos en el último año.

router.get('/endpoint13', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const ventasCollection = db.collection('Ventas'); 
      const fechaUnAnoAtras = new Date();
      fechaUnAnoAtras.setFullYear(fechaUnAnoAtras.getFullYear() - 1);
  
      const proveedoresConVentas = await ventasCollection.distinct('empleado.proveedor.nombre', {
        fechaVenta: {
          $gte: fechaUnAnoAtras, 
          $lte: new Date() 
        }
      });
  
      const proveedoresCollection = db.collection('Proveedores'); 
      const todosLosProveedores = await proveedoresCollection.distinct('nombre');
    const proveedoresSinVentas = todosLosProveedores.filter(
        proveedor => !proveedoresConVentas.includes(proveedor)
      );
  
      client.close();
  
      res.json(proveedoresSinVentas);
    } catch (error) {
      res.status(404).json('Error al buscar proveedores sin ventas en el último año');
    }
  });


  //14. Obtener el total de medicamentos vendidos en marzo de 2023.

router.get('/endpoint14', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const collection = db.collection('Ventas'); 
      const fechaInicioMarzo = new Date('2023-03-01T00:00:00.000+00:00');
      const fechaFinMarzo = new Date('2023-03-31T23:59:59.999+00:00');

      const result = await collection.find({
        'fechaVenta': {
          $gte: fechaInicioMarzo,
          $lte: fechaFinMarzo
        }
      }).toArray();
  
      let totalMedicamentosVendidos = 0;
      for (const venta of result) {
        for (const medicamento of venta.medicamentosVendidos) {
          totalMedicamentosVendidos += medicamento.cantidadVendida;
        }
      }
  
      client.close();
  
      res.json({ totalMedicamentosVendidos });
    } catch (error) {
      res.status(404).json('No se encontraron ventas en marzo de 2023');
    }
  });

  //15. Obtener el medicamento menos vendido en 2023.

router.get('/endpoint15', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const collection = db.collection('Ventas');
      
      const fechaInicio2023 = new Date('2023-01-01T00:00:00.000+00:00');
      const fechaFin2023 = new Date('2023-12-31T23:59:59.999+00:00');
        const result = await collection.find({
        'fechaVenta': {
          $gte: fechaInicio2023,
          $lte: fechaFin2023
        }
      }).toArray();
  
      const medicamentosVendidos = {};
  
      for (const venta of result) {
        for (const medicamento of venta.medicamentosVendidos) {
          const nombreMedicamento = medicamento.nombreMedicamento;
          const cantidadVendida = medicamento.cantidadVendida;
  
          if (!medicamentosVendidos[nombreMedicamento]) {
            medicamentosVendidos[nombreMedicamento] = 0;
          }
  
          medicamentosVendidos[nombreMedicamento] += cantidadVendida;
        }
      }
  
      const medicamentoMenosVendido = Object.keys(medicamentosVendidos).reduce((min, medicamento) => {
        return medicamentosVendidos[medicamento] < medicamentosVendidos[min] ? medicamento : min;
      }, Object.keys(medicamentosVendidos)[0]);
  
      client.close();
  
      res.json({ medicamentoMenosVendido });
    } catch (error) {
      res.status(404).json('No se encontraron ventas en 2023');
    }
  });

  //16. Ganancia total por proveedor en 2023 (asumiendo un campo precioCompra en Compras).

router.get('/endpoint16', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const comprasCollection = db.collection('Compras'); 
      const fechaInicio2023 = new Date('2023-01-01T00:00:00.000+00:00');
      const fechaFin2023 = new Date('2023-12-31T23:59:59.999+00:00');
        const pipeline = [
        {
          $match: {
            fechaCompra: {
              $gte: fechaInicio2023,
              $lte: fechaFin2023
            }
          }
        },
        {
          $unwind: '$medicamentosComprados'
        },
        {
          $group: {
            _id: '$proveedor.nombre',
            gananciaTotal: { $sum: { $multiply: ['$medicamentosComprados.cantidadComprada', '$medicamentosComprados.precioCompra'] } }
          }
        }
      ];
  
      const result = await comprasCollection.aggregate(pipeline).toArray();
  
      client.close();
  
      res.json(result);
    } catch (error) {
      res.status(404).json('No se encontraron registros de compras en 2023');
    }
  });

  //17. Promedio de medicamentos comprados por venta.

router.get('/endpoint17', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const collection = db.collection('Compras'); 
      const result = await collection.find({}).toArray();
  
      let totalMedicamentos = 0;
      let totalVentas = result.length;
  
      for (const compra of result) {
        totalMedicamentos += compra.medicamentosComprados.length;
      }
  
      const promedio = totalVentas > 0 ? totalMedicamentos / totalVentas : 0;
  
      client.close();
  
      res.json({ promedio });
    } catch (error) {
      res.status(404).json('No se encontraron compras');
    }
  });
  

  //18: Cantidad de ventas realizadas por cada empleado en 2023.

router.get('/endpoint18', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const collection = db.collection('Ventas'); 
      const fechaInicio2023 = new Date('2023-01-01T00:00:00.000+00:00');
      const fechaFin2023 = new Date('2023-12-31T23:59:59.999+00:00');
  
      const result = await collection.find({
        'fechaVenta': {
          $gte: fechaInicio2023,
          $lte: fechaFin2023
        }
      }).toArray();
  
      const ventasPorEmpleado = {};
  
      for (const venta of result) {
        const empleado = venta.empleado.nombre;
  
        if (!ventasPorEmpleado[empleado]) {
          ventasPorEmpleado[empleado] = 0;
        }
  
        ventasPorEmpleado[empleado]++;
      }
  
      client.close();
  
      res.json(ventasPorEmpleado);
    } catch (error) {
      res.status(404).json('No se encontraron ventas en 2023');
    }
  });

  //19. Obtener todos los medicamentos que expiren en 2024.

router.get('/endpoint19', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const collection = db.collection('Medicamentos'); 
      const fechaInicio2024 = new Date('2024-01-01T00:00:00.000+00:00');
      const fechaFin2024 = new Date('2024-12-31T23:59:59.999+00:00');
  
      const result = await collection.find({
        'fechaExpiracion': {
          $gte: fechaInicio2024,
          $lte: fechaFin2024
        }
      }).toArray();
  
      client.close();
  
      res.json(result);
    } catch (error) {
      res.status(404).json('No se encontraron medicamentos que expiren en 2024');
    }
  });
  
  //20. Empleados que hayan hecho más de 5 ventas en total.
router.get('/endpoint20', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const ventasCollection = db.collection('Ventas'); 
      const pipeline = [
        {
          $unwind: '$medicamentosVendidos'
        },
        {
          $group: {
            _id: '$empleado.nombre',
            ventasRealizadas: { $sum: 1 }
          }
        },
        {
          $match: {
            ventasRealizadas: { $gt: 5 } 
          }
        }
      ];
  
      const result = await ventasCollection.aggregate(pipeline).toArray();
  
      client.close();
  
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404).json('No se encontraron empleados con más de 5 ventas');
      }
    } catch (error) {
      res.status(404).json('Error al buscar empleados');
    }
  });
  
  
  

//21.Medicamentos que no han sido vendidos nunca.

router.get('/endpoint21', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const medicamentosCollection = db.collection('Medicamentos'); 
        const ventasCollection = db.collection('Ventas'); 

        const medicamentos = await medicamentosCollection.find({}).toArray();

        const medicamentosVendidos = await ventasCollection.distinct('medicamentosVendidos.nombreMedicamento');

        const medicamentosNoVendidos = medicamentos.filter(medicamento => !medicamentosVendidos.includes(medicamento.nombre));

        res.json({ medicamentosNoVendidos });
    } catch (error) {
        console.error('Error al obtener los medicamentos no vendidos:', error);
        res.status(500).json({ error: 'Error al obtener los medicamentos no vendidos.' });
    }
});


//22. Paciente que ha gastado más dinero en 2023.


router.get('/endpoint22', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const ventasCollection = db.collection('Ventas'); 
      const fechaInicio2023 = new Date('2023-01-01T00:00:00.000+00:00');
      const fechaFin2023 = new Date('2023-12-31T23:59:59.999+00:00');
  
      const pipeline = [
        {
          $match: {
            fechaVenta: {
              $gte: fechaInicio2023,
              $lte: fechaFin2023
            }
          }
        },
        {
          $unwind: '$medicamentosVendidos'
        },
        {
          $group: {
            _id: '$paciente.nombre',
            gastoTotal: { $sum: { $multiply: ['$medicamentosVendidos.cantidadVendida', '$medicamentosVendidos.precio'] } }
          }
        },
        {
          $sort: {
            gastoTotal: -1 
          }
        },
        {
          $limit: 1 
        }
      ];
  
      const result = await ventasCollection.aggregate(pipeline).toArray();
  
      client.close();
  
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json('No se encontraron pacientes en 2023');
      }
    } catch (error) {
      res.status(404).json('No se encontraron pacientes en 2023');
    }
  });
  
  //23. Empleados que no han realizado ninguna venta en 2023

router.get('/endpoint23', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const ventasCollection = db.collection('Ventas'); 
      const fechaInicio2023 = new Date('2023-01-01T00:00:00.000+00:00');
      const fechaFin2023 = new Date('2023-12-31T23:59:59.999+00:00');
  
      const empleadosConVentas = await ventasCollection.distinct('empleado.nombre', {
        fechaVenta: {
          $gte: fechaInicio2023,
          $lte: fechaFin2023
        }
      });
  
      const empleadosCollection = db.collection('Empleados'); // Asume que tienes una colección 'Empleados'
      const todosLosEmpleados = await empleadosCollection.distinct('nombre');
  
      const empleadosSinVentas = todosLosEmpleados.filter(
        empleado => !empleadosConVentas.includes(empleado)
      );
  
      client.close();
  
      res.json(empleadosSinVentas);
    } catch (error) {
      res.status(404).json('Error al buscar empleados sin ventas en 2023');
    }
  });
  

  //24. Proveedor que ha suministrado más medicamentos en 2023.


router.get('/endpoint24', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const comprasCollection = db.collection('Compras'); 
      const fechaInicio2023 = new Date('2023-01-01T00:00:00.000+00:00');
      const fechaFin2023 = new Date('2023-12-31T23:59:59.999+00:00');
  
      const pipeline = [
        {
          $match: {
            fechaCompra: {
              $gte: fechaInicio2023,
              $lte: fechaFin2023
            }
          }
        },
        {
          $unwind: '$medicamentosComprados'
        },
        {
          $group: {
            _id: '$proveedor.nombre',
            suministroTotal: { $sum: '$medicamentosComprados.cantidadComprada' }
          }
        },
        {
          $sort: {
            suministroTotal: -1 
          }
        },
        {
          $limit: 1 
        }
      ];
  
      const result = await comprasCollection.aggregate(pipeline).toArray();
  
      client.close();
  
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json('No se encontraron proveedores en 2023');
      }
    } catch (error) {
      res.status(404).json('No se encontraron proveedores en 2023');
    }
  });

  //25. Pacientes que compraron el medicamento “Paracetamol” en 2023.

router.get('/endpoint25', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const ventasCollection = db.collection('Ventas'); 
      const fechaInicio2023 = new Date('2023-01-01T00:00:00.000+00:00');
      const fechaFin2023 = new Date('2023-12-31T23:59:59.999+00:00');
  
      const result = await ventasCollection.find({
        fechaVenta: {
          $gte: fechaInicio2023,
          $lte: fechaFin2023
        },
        'medicamentosVendidos.nombreMedicamento': 'Paracetamol'
      }).toArray();
  
      client.close();
  
      if (result.length > 0) {
        const pacientes = result.map(venta => venta.paciente);
        res.json(pacientes);
      } else {
        res.status(404).json('No se encontraron pacientes que compraron Paracetamol en 2023');
      }
    } catch (error) {
      res.status(404).json('No se encontraron pacientes que compraron Paracetamol en 2023');
    }
  });
  
//26.Total de medicamentos vendidos por mes en 2023.

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

  

//27.Empleados con menos de 5 ventas en 2023.

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

//28.Número total de proveedores que suministraron medicamentos en 2023.

router.get('/endpoint28', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const comprasCollection = db.collection('Compras');
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

//29.Proveedores de los medicamentos con menos de 50 unidades en stock.

router.get('/endpoint29', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const medicamentosCollection = db.collection('Medicamentos');
        const medicamentosBajoStock = await medicamentosCollection.find({ stock: { $lt: 50 } }).toArray();
        const proveedores = [...new Set(medicamentosBajoStock.map(med => med.proveedor.nombre))];
        const nombresMedicamentos = medicamentosBajoStock.map(med => med.nombre);
        res.json({ proveedores, nombresMedicamentos });
    } catch (error) {
        console.error('Error al obtener proveedores con stock bajo:', error);
        res.status(500).json({ error: 'Error al obtener proveedores con stock bajo.' });
    }
});

//30.Pacientes que no han comprado ningún medicamento en 2023.

router.get('/endpoint30', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const ventasCollection = db.collection('Ventas');
        const ventas = await ventasCollection.find({}).toArray();
        const medicamentosVendidosConNombre = [];
        ventas.forEach(venta => {
            if (venta.medicamentosVendidos && Array.isArray(venta.medicamentosVendidos)) {
                venta.medicamentosVendidos.forEach(medicamento => {
                    if (medicamento.nombreMedicamento) {
                        const nombrePaciente = venta.paciente && venta.paciente.nombre ? venta.paciente.nombre : 'Desconocido';
                        medicamentosVendidosConNombre.push({
                            nombreMedicamento: medicamento.nombreMedicamento,
                            nombrePaciente: nombrePaciente,
                        });
                    }
                });
            }
        });
        res.json({ medicamentosVendidosConNombre });
    } catch (error) {
        console.error('Error al obtener la información de medicamentos vendidos con nombres de pacientes:', error);
        res.status(500).json({ error: 'Error al obtener la información de medicamentos vendidos con nombres de pacientes.' });
    }
});

//31.Medicamentos que han sido vendidos cada mes del año 2023.

router.get('/endpoint31', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const ventasCollection = db.collection('Ventas');
        const ventas2023 = await ventasCollection.find({
            fechaVenta: {
                $gte: new Date('2023-01-01'),
                $lt: new Date('2024-01-01')
            }
        }).toArray();
        const ventasPorMes = {};
        ventas2023.forEach(venta => {
            const fechaVenta = new Date(venta.fechaVenta);
            const mes = fechaVenta.getMonth() + 1; 
            const año = fechaVenta.getFullYear();

            const key = `${año}-${mes}`;

            if (!ventasPorMes[key]) {
                ventasPorMes[key] = [];
            }

            ventasPorMes[key].push({
                nombreMedicamento: venta.medicamentosVendidos[0].nombreMedicamento,
                cantidadVendida: venta.medicamentosVendidos[0].cantidadVendida,
                precio: venta.medicamentosVendidos[0].precio
            });
        });

        res.json({ ventasPorMes });
    } catch (error) {
        console.error('Error al obtener las ventas por mes en 2023:', error);
        res.status(500).json({ error: 'Error al obtener las ventas por mes en 2023.' });
    }
});

//32. Empleado que ha vendido la mayor cantidad de medicamentos distintos en 2023.

router.get('/endpoint32', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const ventasCollection = db.collection('Ventas');
      const fechaInicio2023 = new Date('2023-01-01T00:00:00.000+00:00');
      const fechaFin2023 = new Date('2023-12-31T23:59:59.999+00:00');
  
      const pipeline = [
        {
          $match: {
            fechaVenta: {
              $gte: fechaInicio2023,
              $lte: fechaFin2023
            }
          }
        },
        {
          $unwind: '$medicamentosVendidos'
        },
        {
          $group: {
            _id: '$empleado.nombre',
            medicamentosDistintos: { $addToSet: '$medicamentosVendidos.nombreMedicamento' }
          }
        },
        {
          $sort: {
            totalMedicamentosDistintos: -1 
          }
        },
        {
          $limit: 1 
        }
      ];
  
      const result = await ventasCollection.aggregate(pipeline).toArray();
  
      client.close();
  
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json('No se encontraron empleados en 2023');
      }
    } catch (error) {
      res.status(404).json('No se encontraron empleados en 2023');
    }
  });
  

//33. empleado-mayor-venta-medicamentos-distintos-2023

router.get('/endpoint33', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const ventasCollection = db.collection('Ventas');
      const fechaInicio2023 = new Date('2023-01-01T00:00:00.000+00:00');
      const fechaFin2023 = new Date('2023-12-31T23:59:59.999+00:00');
  
      const pipeline = [
        {
          $match: {
            fechaVenta: {
              $gte: fechaInicio2023,
              $lte: fechaFin2023
            }
          }
        },
        {
          $unwind: '$medicamentosVendidos'
        },
        {
          $group: {
            _id: '$paciente.nombre',
            gastoTotal: { $sum: { $multiply: ['$medicamentosVendidos.cantidadVendida', '$medicamentosVendidos.precio'] } }
          }
        },
        {
          $sort: {
            gastoTotal: -1 
          }
        },
        {
          $limit: 1 
        }
      ];
  
      const result = await ventasCollection.aggregate(pipeline).toArray();
  
      client.close();
  
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json('No se encontraron pacientes en 2023');
      }
    } catch (error) {
      res.status(404).json('No se encontraron pacientes en 2023');
    }
  });

  //34.Medicamentos que no han sido vendidos en 2023.
  router.get('/endpoint34', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const medicamentosCollection = db.collection('Medicamentos'); 
        const medicamentos = await medicamentosCollection.find({}).toArray();

        const nombresMedicamentosMed = medicamentos.map(med => med.nombre);
        const nombresMedicamentosVentas = ventas.flatMap(venta =>
            venta.medicamentosVendidos.map(med => med.nombreMedicamento)
        );

        const medicamentosFaltantesEnVentas = nombresMedicamentosMed.filter(
            nombre => !nombresMedicamentosVentas.includes(nombre)
        );

        res.json({ medicamentos, medicamentosFaltantesEnVentas });
    } catch (error) {
        console.error('Error al obtener el stock:', error);
        res.status(500).json({ error: 'Error al obtener el stock.' });
    }
});

// 35. Proveedores que han suministrado al menos 5 medicamentos diferentes en 2023.

router.get('/endpoint35', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const medicamentosCollection = db.collection('Medicamentos'); 
  
      // Definir las fechas de inicio y fin de 2023
      const fechaInicio2023 = new Date('2023-01-01T00:00:00.000+00:00');
      const fechaFin2023 = new Date('2023-12-31T23:59:59.999+00:00');

      const pipeline = [
        {
          $match: {
            fechaExpiracion: {
              $gte: fechaInicio2023,
              $lte: fechaFin2023
            }
          }
        },
        {
          $group: {
            _id: '$proveedor.nombre',
            medicamentosDiferentes: { $addToSet: '$nombre' }
          }
        },
        {
          $match: {
            medicamentosDiferentes: { $size: { $gte: 5 } } 
          }
        }
      ];
  
      const result = await medicamentosCollection.aggregate(pipeline).toArray();
  
      client.close();
  
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404).json('No se encontraron proveedores con al menos 5 medicamentos diferentes en 2023');
      }
    } catch (error) {
      res.status(404).json('no hay');
    }
  });

  //36. Total de medicamentos vendidos en el primer trimestre de 2023.


router.get('/endpoint36', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const ventasCollection = db.collection('Ventas'); 
  
      const fechaInicioPrimerTrimestre = new Date('2023-01-01T00:00:00.000+00:00');
      const fechaFinPrimerTrimestre = new Date('2023-03-31T23:59:59.999+00:00');
  
      const result = await ventasCollection.aggregate([
        {
          $match: {
            fechaVenta: {
              $gte: fechaInicioPrimerTrimestre,
              $lte: fechaFinPrimerTrimestre
            }
          }
        },
        {
          $unwind: '$medicamentosVendidos'
        },
        {
          $group: {
            _id: null,
            totalMedicamentosVendidos: { $sum: '$medicamentosVendidos.cantidadVendida' }
          }
        }
      ]).toArray();
  
      client.close();
  
      if (result.length > 0) {
        res.json(result[0].totalMedicamentosVendidos);
      } else {
        res.status(404).json('No se encontraron ventas en el primer trimestre de 2023');
      }
    } catch (error) {
      res.status(404).json('No se encontraron ventas en el primer trimestre de 2023');
    }
  });

  //37. Empleados que no realizaron ventas en abril de 2023.

router.get('/endpoint37', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const ventasCollection = db.collection('Ventas'); 
  
      const fechaInicioAbril2023 = new Date('2023-04-01T00:00:00.000+00:00');
      const fechaFinAbril2023 = new Date('2023-04-30T23:59:59.999+00:00');
  
      const ventasAbril2023 = await ventasCollection.find({
        fechaVenta: {
          $gte: fechaInicioAbril2023,
          $lte: fechaFinAbril2023
        }
      }).toArray();
  
      const empleadosConVentasAbril2023 = new Set(ventasAbril2023.map(venta => venta.empleado.nombre));
  
      const empleadosCollection = db.collection('Empleados'); 
      const todosLosEmpleados = await empleadosCollection.find({}).toArray();
  
      const empleadosSinVentasAbril2023 = todosLosEmpleados.filter(empleado => !empleadosConVentasAbril2023.has(empleado.nombre));
  
      client.close();
  
      if (empleadosSinVentasAbril2023.length > 0) {
        res.json(empleadosSinVentasAbril2023);
      } else {
        res.json('Todos los empleados realizaron ventas en abril de 2023.');
      }
    } catch (error) {
      res.status(500).json('Error al buscar empleados.');
    }
  });
  
  //38. Medicamentos con un precio mayor a 50 y un stock menor a 100.
  
  router.get('/endpoint38', async (req, res) => {
    try {
      const client = new MongoClient(bases);
      await client.connect();
      const db = client.db('farmaciaCampus');
      const medicamentosCollection = db.collection('Medicamentos'); 
  
      const filtro = {
        precio: { $gt: 50 }, 
        stock: { $lt: 100 }   
      };
  
      const medicamentos = await medicamentosCollection.find(filtro).toArray();
  
      client.close();
  
      if (medicamentos.length > 0) {
        res.json(medicamentos);
      } else {
        res.status(404).json('No se encontraron medicamentos con precio mayor a 50 y stock menor a 100.');
      }
    } catch (error) {
      res.status(500).json('Error al buscar medicamentos.');
    }
  });
  
  










module.exports = router



