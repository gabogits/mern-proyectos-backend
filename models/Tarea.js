const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required:true,
        trim:true
    }, 
    estado: {
        type:Boolean,
        default:false
    },
    creado: {
        type:Date,
        default: Date.now()
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto' //este es el nombre del modelo, debe ser llamado igual
    }
});
module.exports = mongoose.model('Tarea', TareaSchema);