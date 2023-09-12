const {MongoClient} = require('mongodb')
const pacientesSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    direccion: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define un método personalizado para obtener solo los nombres


const pacientes = async (req,res)=> {
  try {
    const nombres = await pacientesSchema.find({}, 'nombre'); // 'this' se refiere al modelo Pacientes
    return nombres.map((paciente) => paciente.nombre);
  } catch (error) {
    throw error;
  }
};

const Pacientes = model('Pacientes', pacientes, 'Pacientes');

module.exports = Pacientes;
