const {Schema, model} = require('mongoose')
const medicamentosSchema = Schema(
    {
        nombre:{
            type: String,
            required: true,
            trim:true,
        },
        precio:{
            type: Number,
            required: true,
            trim:true,
        },
        stock:{
            type: Number,
            required: true,
            trim:true,
        },
        fechaExpiracion:{
            type: String,
            required: true,
            trim:true,
        },
        proveedor:{
            type: Array,
            required: true,
            trim:true,
        },
    },
    {
        timestamps:true
    }
)

const medicamentos = async(req,res)=>{
    try {
        const medicamentos = await medicamentosSchema.find({stock:{$lt:50}})
        return medicamentos.map((medicamentos)=> medicamentos.stock)
    } catch (error) {
        
    }
}

const Medicamentos = model("Medicamentos", medicamentos, "Medicamentos");

module.exports = Medicamentos