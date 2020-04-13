const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type:String,
        require:true,
        trim:true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, //cada usuario tiene su id
        ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now()

    }
})

module.exports = mongoose.model('Proyecto', ProyectoSchema );