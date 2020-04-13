const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    nombre: {
        type:String,
        require: true,
        trim:true //mongodb antes de hacer la insercion en la base de datos va eliminar los posibles espacios en blanco que haya al inicio y al final
    },
    email: {
        type:String,
        require: true,
        trim:true,
        unique: true //para que no se reistren con el mismo correo
    },
    password: {
        type:String,
        require: true,
        trim:true
    },
    registro: {
        type: Date,
        default: Date.now() //este dato no lo manda el usuario, lo genera automaticamente la base de datos
    }
});

module.exports = mongoose.model('Usuario', UsuariosSchema);