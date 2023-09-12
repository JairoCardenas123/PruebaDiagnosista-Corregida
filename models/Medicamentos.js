
const medicamentosSchema = (
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        precio: {
            type: Number,
            required: true,
            trim: true,
        },
        stock: {
            type: Number,
            required: true,
            trim: true,
        },
        fechaExpiracion: {
            type: String,
            required: true,
            trim: true,
        },
        proveedor: {
            type: Array,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true
    }
);

const obtenerMedicamentos = async (req, res) => {
    try {
        const medicamentos = await Medicamentos.find({ stock: { $lt: 50 } });
        return medicamentos.map((medicamento) => medicamento.stock);
    } catch (error) {
        // Manejar errores aquí
    }
}

const Medicamentos = ("Medicamentos", obtenerMedicamentos, "Medicamentos");

module.exports = Medicamentos;
