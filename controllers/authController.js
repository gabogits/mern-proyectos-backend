const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  // revisar si hay errores   //las reglas de express-validator van en el routing pero el resultado va en el controlador
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer el email y password

  const { email, password } = req.body;

  try {
    //revisar que sea un usuario registrado
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
    //revisar el passwprd
    const passCorrecto = await bcryptjs.compare(password, usuario.password); //comparamos el password que esta mandando el req el cliente con el que esta  en la base de datos
    if (!passCorrecto) {
      return res.status(400).json({ msg: "password incorrecto" });
    }

    const payload = {
      //payload es la informacion con la que se va a crear el webtoken
      usuario: {
        id: usuario.id,
      },
    };
    //firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    ); //La palabra SECRETA debe ser
  } catch (error) {
    console.log(error);
  }
};
