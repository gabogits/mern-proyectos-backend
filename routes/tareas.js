const express =  require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middlewares/auth');
const { check }= require('express-validator');

//crear una tarea
//api/tarea

router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

//obtener las tareas por proyecto
router.get('/', 
    auth,
    tareaController.obtenerTareas
);
//autualizar tarea
router.put('/:id', 
    auth,
    tareaController.actualizarTarea
);

//eliminar tarea
router.delete('/:id', 
    auth,
    tareaController.eliminarTarea
);


module.exports = router;