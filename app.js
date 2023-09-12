const {Server} = require('./models/Server.js')
const dotenv = require('dotenv')


dotenv.config()
const server = new Server()



server.listen()