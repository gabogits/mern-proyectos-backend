const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

//crea una nueva tarea
exports.crearTarea = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //extraer el proyecto y comprobar si existe
 
  try {
    const { proyecto } = req.body;
    const proyectoExistente = await Proyecto.findById(proyecto);
    if (!proyectoExistente) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    //revisar si el proyecto actual pertenece al usuario autenticado
    //verificar el creador del proyecto
    if (proyectoExistente.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    //creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({tarea})
    console.log("esta es la nueva tarea", {tarea})
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

//obtiene las tareas por proyecto
exports.obtenerTareas = async (req, res) => {

    try {
       // const { proyecto } = req.body; en la integracion del back con el from se reolvio asi
       const { proyecto } = req.query;

        const proyectoExistente = await Proyecto.findById(proyecto);
        if (!proyectoExistente) {
          return res.status(404).json({ msg: "Proyecto no encontrado" });
        }
        //revisar si el proyecto actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if (proyectoExistente.creador.toString() !== req.usuario.id) {
          return res.status(401).json({ msg: "No autorizado" });
        }
        //obtener las tarea por tareas

        const tareas = await Tarea.find({proyecto}).sort({creado: -1})
        res.json({tareas})
       
      } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
      }

}

//actualizar una tarea

exports.actualizarTarea = async (req, res) => {

    try {
        const { proyecto, nombre, estado } = req.body;
       //si la tarea existe o no
       let tarea= await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ msg: "No existe esa tarea" });
        }
       
        const proyectoExistente = await Proyecto.findById(proyecto);
     
        //revisar si el proyecto actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if (proyectoExistente.creador.toString() !== req.usuario.id) {
          return res.status(401).json({ msg: "No autorizado" });
        }

        //crear un objeto con la nueva informacion
        const tareaActualizada = {}
       tareaActualizada.nombre = nombre;
        tareaActualizada.estado = estado;
    
        //guardar la tarea
        tarea = await Tarea.findOneAndUpdate({_id : req.params.id}, tareaActualizada, {new:true});
       res.json({tarea})
      } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
      }
}

//eliminar una tarea

exports.eliminarTarea = async (req, res) => {
    try {
        const { proyecto } = req.query;
       //si la tarea existe o no
       let tarea= await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ msg: "No existe esa tarea" });
        }
       
        const proyectoExistente = await Proyecto.findById(proyecto);
     
        //revisar si el proyecto actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if (proyectoExistente.creador.toString() !== req.usuario.id) {
          return res.status(401).json({ msg: "No autorizado" });
        }

        //eliminar la tarea
        await Tarea.findOneAndRemove({_id : req.params.id});
       res.json({msg: 'Tarea eliminada'})
      } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
      }
}

