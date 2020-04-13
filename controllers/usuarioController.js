const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearUsuario =  async (req, res) => {
    // revisar si hay errores   //las reglas de express-validator van en el routing pero el resultado va en el controlador 
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    //extraer email y password
    const {email, password} = req.body;
   try {
    //revisar que el usuario registrado sea unico
    let usuario = await Usuario.findOne({email}) ;

    if(usuario) {
        return res.status(400).json({msg: 'El usuario ya existe'});
    }
    

    // crea el nuevo usuario
    usuario = new Usuario(req.body);
    //hashear el password 
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt)

    //guardar usuario

    await usuario.save();
    //mensaje de confirmacion 

    //crear y firmar el JWT
    const payload = { //payload es la informacion con la que se va a crear el webtoken
        usuario: {
            id: usuario.id
        }
    }
    //firmar el JWT
    jwt.sign(payload, process.env.SECRETA, { //se usa jwt por que en la parte de react del cliente no hay sesiones, como php, no puedes acceder al servidor
        expiresIn: 3600
    }, (error, token) => {
        if(error) throw error;

        res.json({token})
    } ) //La palabra SECRETA debe ser la misma para firmar un token cuando es creado el usuario ai como para autenticarlo

 
   } catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error');
   }
}