//rutas para autenticar usuarios
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require('../middlewares/auth');
//para iniciar sesion
//api/auth

router.post(
  "/",
  authController.autenticarUsuario
);
// Obtiene el usaurio autenticado
router.get(
  "/",
  auth,
  [
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength(
      6
    ),
  ],
  authController.usuarioAutenticado
);

module.exports = router;
