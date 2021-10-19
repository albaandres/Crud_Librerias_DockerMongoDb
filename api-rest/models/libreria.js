'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const LibreriaSchema = Schema({
nombre: String,
especialidad: String,
calle: String,
longitud: String,
latitud: String,
numero:Number
})
module.exports = mongoose.model('Librerias',LibreriaSchema)