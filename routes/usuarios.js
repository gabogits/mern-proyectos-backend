//rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator')

//crea un suaurio
//api/usuarios

router.post('/', 
    [
        //las reglas de express-validator van en el routing pero el resultado va en el controlador
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength(6),
    ], 
    usuarioController.crearUsuario
);
//esto funcionaria igual si hicieramos los imports asi 

//const {crearUsuario } = require('../controllers/usuarioController');
//router.post('/', crearUsuario);


module.exports = router;