const mongoose= require('mongoose')
require('dotenv').config()

async function connectToMongodb(){
    return mongoose.connect(process.env.db)
}

module.exports = {
    connectToMongodb
}