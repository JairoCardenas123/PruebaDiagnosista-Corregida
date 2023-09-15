const express = require('express');
const router = express.Router()
const app = express();

require('dotenv').config();
const port = process.env.PORT;

const routerBase = require('./routes/routes.js')
app.use('/usuarios', routerBase)

app.use(express.json());

app.listen(port,()=>{
    console.log('Esta corriendo en el puerto:8000');
})
