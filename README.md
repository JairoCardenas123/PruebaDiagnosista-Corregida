# 1 ENDPOINT






//////////////////////////////////////////////////////////////////
#  JSON MEDICAMENTOS
//////////////////////////////////////////////////////////////////
[
    {
      "_id": "64fb4574bd93c98c434b9191",
      "nombre": "Metformina",
      "precio": 60,
      "stock": 180,
      "fechaExpiracion": "2024-09-29T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorA",
        "contacto": "contacto@proveedora.com"
      }
    },
    {
      "_id": "64fb4574bd93c98c434b9194",
      "nombre": "Loratadina",
      "precio": 22,
      "stock": 120,
      "fechaExpiracion": "2025-02-19T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorA",
        "contacto": "contacto@proveedora.com"
      }
    },
    {
      "_id": "64fb4574bd93c98c434b918b",
      "nombre": "Paracetamol",
      "precio": 20,
      "stock": 150,
      "fechaExpiracion": "2024-06-15T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorA",
        "contacto": "contacto@proveedora.com"
      }
    },
    {
      "_id": "64fb4574bd93c98c434b918e",
      "nombre": "Amoxicilina",
      "precio": 40,
      "stock": 75,
      "fechaExpiracion": "2025-08-11T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorA",
        "contacto": "contacto@proveedora.com"
      }
    },
    {
      "_id": "64fb4574bd93c98c434b9192",
      "nombre": "Atorvastatina",
      "precio": 45,
      "stock": 200,
      "fechaExpiracion": "2024-10-05T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorB",
        "contacto": "contacto@proveedora.com"
      }
    },
    {
      "_id": "64fb4574bd93c98c434b918f",
      "nombre": "Cetirizina",
      "precio": 10,
      "stock": 110,
      "fechaExpiracion": "2024-01-23T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorB",
        "contacto": "contacto@proveedora.com"
      }
    },
    {
      "_id": "64fb4574bd93c98c434b918c",
      "nombre": "Ibuprofeno",
      "precio": 25,
      "stock": 50,
      "fechaExpiracion": "2024-12-01T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorB",
        "contacto": "contacto@proveedora.com"
      }
    },
    {
      "_id": "64fb4574bd93c98c434b9190",
      "nombre": "Losartan",
      "precio": 55,
      "stock": 95,
      "fechaExpiracion": "2024-07-30T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorC",
        "contacto": "contacto@proveedora.com"
      }
    },
    {
      "_id": "64fb4574bd93c98c434b9193",
      "nombre": "Clonazepam",
      "precio": 35,
      "stock": 25,
      "fechaExpiracion": "2024-04-21T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorC",
        "contacto": "contacto@proveedora.com"
      }
    }
  ]


//////////////////////////////////////////////////////////////////
#  JSON VENTAS
//////////////////////////////////////////////////////////////////


  [
  {
    "_id": "64fb45b1bd93c98c434b919f",
    "fechaCompra": "2023-01-01T00:00:00.000+00:00",
    "proveedor": {
      "nombre": "ProveedorA",
      "contacto": "contacto@proveedora.com"
    },
    "medicamentosComprados": [
      {
        "nombreMedicamento": "Paracetamol",
        "cantidadComprada": 50,
        "precioCompra": 15
      }
    ]
  },
  {
    "_id": "64fb45b1bd93c98c434b91a6",
    "fechaCompra": "2023-05-05T00:00:00.000+00:00",
    "proveedor": {
      "nombre": "ProveedorB",
      "contacto": "contacto@proveedora.com"
    },
    "medicamentosComprados": [
      {
        "nombreMedicamento": "Atorvastatina",
        "cantidadComprada": 70,
        "precioCompra": 40
      }
    ]
  },
  {
    "_id": "64fb45b1bd93c98c434b91a7",
    "fechaCompra": "2023-06-10T00:00:00.000+00:00",
    "proveedor": {
      "nombre": "ProveedorC",
      "contacto": "contacto@proveedora.com"
    },
    "medicamentosComprados": [
      {
        "nombreMedicamento": "Clonazepam",
        "cantidadComprada": 15,
        "precioCompra": 32
      }
    ]
  },
  {
    "_id": "64fb45b1bd93c98c434b91a0",
    "fechaCompra": "2023-01-10T00:00:00.000+00:00",
    "proveedor": {
      "nombre": "ProveedorB",
      "contacto": "contacto@proveedora.com"
    },
    "medicamentosComprados": [
      {
        "nombreMedicamento": "Ibuprofeno",
        "cantidadComprada": 25,
        "precioCompra": 20
      }
    ]
  },
  {
    "_id": "64fb45b1bd93c98c434b91a5",
    "fechaCompra": "2023-04-20T00:00:00.000+00:00",
    "proveedor": {
      "nombre": "ProveedorA",
      "contacto": "contacto@proveedora.com"
    },
    "medicamentosComprados": [
      {
        "nombreMedicamento": "Metformina",
        "cantidadComprada": 60,
        "precioCompra": 55
      }
    ]
  },
  {
    "_id": "64fb45b1bd93c98c434b91a4",
    "fechaCompra": "2023-04-01T00:00:00.000+00:00",
    "proveedor": {
      "nombre": "ProveedorC",
      "contacto": "contacto@proveedora.com"
    },
    "medicamentosComprados": [
      {
        "nombreMedicamento": "Losartan",
        "cantidadComprada": 40,
        "precioCompra": 50
      }
    ]
  },
  {
    "_id": "64fb45b1bd93c98c434b91a1",
    "fechaCompra": "2023-02-01T00:00:00.000+00:00",
    "proveedor": {
      "nombre": "ProveedorC",
      "contacto": "contacto@proveedora.com"
    },
    "medicamentosComprados": [
      {
        "nombreMedicamento": "Aspirina",
        "cantidadComprada": 10,
        "precioCompra": 12
      }
    ]
  },
  {
    "_id": "64fb45b1bd93c98c434b91a3",
    "fechaCompra": "2023-03-05T00:00:00.000+00:00",
    "proveedor": {
      "nombre": "ProveedorB",
      "contacto": "contacto@proveedora.com"
    },
    "medicamentosComprados": [
      {
        "nombreMedicamento": "Cetirizina",
        "cantidadComprada": 50,
        "precioCompra": 8
      }
    ]
  },
  {
    "_id": "64fb45b1bd93c98c434b91a2",
    "fechaCompra": "2023-02-15T00:00:00.000+00:00",
    "proveedor": {
      "nombre": "ProveedorA",
      "contacto": "contacto@proveedora.com"
    },
    "medicamentosComprados": [
      {
        "nombreMedicamento": "Amoxicilina",
        "cantidadComprada": 30,
        "precioCompra": 35
      }
    ]
  },
  {
    "_id": "64fb45b1bd93c98c434b91a8",
    "fechaCompra": "2023-06-30T00:00:00.000+00:00",
    "proveedor": {
      "nombre": "ProveedorA",
      "contacto": "contacto@proveedora.com"
    },
    "medicamentosComprados": [
      {
        "nombreMedicamento": "Loratadina",
        "cantidadComprada": 50,
        "precioCompra": 20
      }
    ]
  }
]

/////////////////////////////////////////////////////////////
# JSON EMPLEADOS
/////////////////////////////////////////////////////////////

[
  {
    "_id": "64fb45dcbd93c98c434b91b1",
    "nombre": "Pedro",
    "cargo": "Vendedor",
    "fechaContratacion": "2020-01-01T00:00:00.000+00:00"
  },
  {
    "_id": "64fb45dcbd93c98c434b91b4",
    "nombre": "Sofia",
    "cargo": "Administradora",
    "fechaContratacion": "2021-03-01T00:00:00.000+00:00"
  },
  {
    "_id": "64fb45dcbd93c98c434b91b3",
    "nombre": "Luis",
    "cargo": "Gerente",
    "fechaContratacion": "2018-02-10T00:00:00.000+00:00"
  },
  {
    "_id": "64fb45dcbd93c98c434b91b2",
    "nombre": "Ana",
    "cargo": "Vendedora",
    "fechaContratacion": "2019-05-15T00:00:00.000+00:00"
  }
]


/////////////////////////////////////////////////////////////
# JSON PACIENTES
/////////////////////////////////////////////////////////////


[
  {
    "_id": "64fb45ccbd93c98c434b91ae",
    "nombre": "Luis",
    "direccion": "Calle 789",
    "telefono": "555-9012"
  },
  {
    "_id": "64fb45ccbd93c98c434b91ac",
    "nombre": "Juan",
    "direccion": "Calle 123",
    "telefono": "555-1234"
  },
  {
    "_id": "64fb45ccbd93c98c434b91af",
    "nombre": "Elena",
    "direccion": "Calle 101",
    "telefono": "555-3456"
  },
  {
    "_id": "64fb45ccbd93c98c434b91ad",
    "nombre": "Maria",
    "direccion": "Calle 456",
    "telefono": "555-5678"
  },
  {
    "_id": "64fb45ccbd93c98c434b91b0",
    "nombre": "Sofia",
    "direccion": "Calle 112",
    "telefono": "555-7890"
  }
]

/////////////////////////////////////////////////////////////
# JSON PROVEEDORES
/////////////////////////////////////////////////////////////



[
  {
    "_id": "64fb45c0bd93c98c434b91aa",
    "nombre": "ProveedorB",
    "contacto": "contacto@proveedorb.com",
    "direccion": "Calle Proveedor 789"
  },
  {
    "_id": "64fb45c0bd93c98c434b91a9",
    "nombre": "ProveedorA",
    "contacto": "contacto@proveedora.com",
    "direccion": "Calle Proveedor 456"
  },
  {
    "_id": "64fb45c0bd93c98c434b91ab",
    "nombre": "ProveedorC",
    "contacto": "contacto@proveedorc.com",
    "direccion": "Calle Proveedor 123"
  }
]


/////////////////////////////////////////////////////////////
# JSON VENTAS
/////////////////////////////////////////////////////////////


[
  {
    "_id": "64fb4593bd93c98c434b919b",
    "fechaVenta": "2023-05-05T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Sofia",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Pedro",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Atorvastatina",
        "cantidadVendida": 1,
        "precio": 45
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b9196",
    "fechaVenta": "2023-01-15T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Maria",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Ana",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Ibuprofeno",
        "cantidadVendida": 1,
        "precio": 25
      },
      {
        "nombreMedicamento": "Aspirina",
        "cantidadVendida": 2,
        "precio": 15
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b9198",
    "fechaVenta": "2023-02-12T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Elena",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Pedro",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Cetirizina",
        "cantidadVendida": 1,
        "precio": 10
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b919a",
    "fechaVenta": "2023-04-15T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Maria",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Ana",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Metformina",
        "cantidadVendida": 1,
        "precio": 60
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b919d",
    "fechaVenta": "2023-06-10T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Juan",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Ana",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Loratadina",
        "cantidadVendida": 1,
        "precio": 22
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b9199",
    "fechaVenta": "2023-03-10T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Juan",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Ana",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Losartan",
        "cantidadVendida": 1,
        "precio": 55
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b9195",
    "fechaVenta": "2023-01-10T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Juan",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Pedro",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Paracetamol",
        "cantidadVendida": 2,
        "precio": 20
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b9197",
    "fechaVenta": "2023-02-05T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Luis",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Pedro",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Amoxicilina",
        "cantidadVendida": 1,
        "precio": 40
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b919e",
    "fechaVenta": "2023-06-30T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Sofia",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Ana",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Paracetamol",
        "cantidadVendida": 2,
        "precio": 20
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b919c",
    "fechaVenta": "2023-05-25T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Elena",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Pedro",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Clonazepam",
        "cantidadVendida": 1,
        "precio": 35
      }
    ]
  }
]



router.get('/endpoint29',async(req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const medicamentosCollection = db.collection('Medicamentos'); 
        const medicamentos = await medicamentosCollection.find({}).toArray();
        res.json({ medicamentos });
    } catch (error) {
        console.error('Error al obtener el stock:', error);
        res.status(500).json({ error: 'Error al obtener el stock.' });
    }
})



[
    {
      "_id": "64fb4574bd93c98c434b9191",
      "nombre": "Metformina",
      "precio": 60,
      "stock": 180,
      "fechaExpiracion": "2024-09-29T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorA",
        "contacto": "contacto@proveedora.com"
      }
    },
    {
      "_id": "64fb4574bd93c98c434b9194",
      "nombre": "Loratadina",
      "precio": 22,
      "stock": 120,
      "fechaExpiracion": "2025-02-19T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorA",
        "contacto": "contacto@proveedora.com"
      }
    },
    {
      "_id": "64fb4574bd93c98c434b918b",
      "nombre": "Paracetamol",
      "precio": 20,
      "stock": 150,
      "fechaExpiracion": "2024-06-15T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorA",
        "contacto": "contacto@proveedora.com"
      }
    },
    {
      "_id": "64fb4574bd93c98c434b918e",
      "nombre": "Amoxicilina",
      "precio": 40,
      "stock": 75,
      "fechaExpiracion": "2025-08-11T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorA",
        "contacto": "contacto@proveedora.com"
      }
    },
    {
      "_id": "64fb4574bd93c98c434b9192",
      "nombre": "Atorvastatina",
      "precio": 45,
      "stock": 200,
      "fechaExpiracion": "2024-10-05T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorB",
        "contacto": "contacto@proveedora.com"
      }
    },
    {
      "_id": "64fb4574bd93c98c434b918f",
      "nombre": "Cetirizina",
      "precio": 10,
      "stock": 110,
      "fechaExpiracion": "2024-01-23T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorB",
        "contacto": "contacto@proveedora.com"
      }
    },
    {
      "_id": "64fb4574bd93c98c434b918c",
      "nombre": "Ibuprofeno",
      "precio": 25,
      "stock": 50,
      "fechaExpiracion": "2024-12-01T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorB",
        "contacto": "contacto@proveedora.com"
      }
    },
    {
      "_id": "64fb4574bd93c98c434b9190",
      "nombre": "Losartan",
      "precio": 55,
      "stock": 95,
      "fechaExpiracion": "2024-07-30T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorC",
        "contacto": "contacto@proveedora.com"
      }
    },
    {
      "_id": "64fb4574bd93c98c434b9193",
      "nombre": "Clonazepam",
      "precio": 35,
      "stock": 25,
      "fechaExpiracion": "2024-04-21T00:00:00.000+00:00",
      "proveedor": {
        "nombre": "ProveedorC",
        "contacto": "contacto@proveedora.com"
      }
    }
  ]



[
  {
    "_id": "64fb4593bd93c98c434b919b",
    "fechaVenta": "2023-05-05T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Sofia",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Pedro",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Atorvastatina",
        "cantidadVendida": 1,
        "precio": 45
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b9196",
    "fechaVenta": "2023-01-15T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Maria",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Ana",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Ibuprofeno",
        "cantidadVendida": 1,
        "precio": 25
      },
      {
        "nombreMedicamento": "Aspirina",
        "cantidadVendida": 2,
        "precio": 15
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b9198",
    "fechaVenta": "2023-02-12T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Elena",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Pedro",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Cetirizina",
        "cantidadVendida": 1,
        "precio": 10
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b919a",
    "fechaVenta": "2023-04-15T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Maria",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Ana",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Metformina",
        "cantidadVendida": 1,
        "precio": 60
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b919d",
    "fechaVenta": "2023-06-10T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Juan",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Ana",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Loratadina",
        "cantidadVendida": 1,
        "precio": 22
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b9199",
    "fechaVenta": "2023-03-10T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Juan",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Ana",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Losartan",
        "cantidadVendida": 1,
        "precio": 55
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b9195",
    "fechaVenta": "2023-01-10T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Juan",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Pedro",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Paracetamol",
        "cantidadVendida": 2,
        "precio": 20
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b9197",
    "fechaVenta": "2023-02-05T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Luis",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Pedro",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Amoxicilina",
        "cantidadVendida": 1,
        "precio": 40
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b919e",
    "fechaVenta": "2023-06-30T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Sofia",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Ana",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Paracetamol",
        "cantidadVendida": 2,
        "precio": 20
      }
    ]
  },
  {
    "_id": "64fb4593bd93c98c434b919c",
    "fechaVenta": "2023-05-25T00:00:00.000+00:00",
    "paciente": {
      "nombre": "Elena",
      "direccion": "Calle 123"
    },
    "empleado": {
      "nombre": "Pedro",
      "cargo": "Vendedor"
    },
    "medicamentosVendidos": [
      {
        "nombreMedicamento": "Clonazepam",
        "cantidadVendida": 1,
        "precio": 35
      }
    ]
  }
]



Mira en el JSON medicamentos y en el JSON Ventas, mira los "nombres" de cada medicamento de cada JSON y si hay alguna que no este en la otra mandamelo en un array

Medicamentos que no han sido vendidos en 2023.








