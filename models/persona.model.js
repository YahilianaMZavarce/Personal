const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
    nombre: {type:String},
    apellido: {type:String},
    genero: {type:String},
    telefono: {type:String},
    edad: {type:Number, required: true},
    region: {type:String, required: true}

})

module.exports = mongoose.model('Persona', personaSchema);