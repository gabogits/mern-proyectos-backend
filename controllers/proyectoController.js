const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator')

exports.creaProyecto = async (req,res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    try {
        //crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        //guardar el creador via JWT
        //console.log(proyecto)
        proyecto.creador = req.usuario.id;
        //guardar el proyecto
        proyecto.save();
        res.json(proyecto)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//obtiene todos los proyectos del usuario actual

exports.obtenerProyectos = async (req, res) => {
    try {
        console.log(req.usuario);
        const proyectos  = await Proyecto.find({creador: req.usuario.id}).sort({creado: -1 })
        res.json({proyectos})
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error')
    }
}

//actualizar un proyecto

exports.actualizarProyecto = async(req, res) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //extraer la informacion del proyecto
    const {nombre } = req.body;
    const proyectoActualizado = {

    }
    if(nombre) {
        proyectoActualizado.nombre = nombre
    }
    try {
         //si el proyecto existe o no
        //revisar el id
        //console.log(req.params.id);
        let proyecto = await Proyecto.findById(req.params.id);

        if(!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'}) //el el curso nunca paso aqui se siguio en el servidor
        }
       
        //verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        } 
        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id}, {$set: proyectoActualizado}, {new:true});
        res.json({proyecto})
        //actualizar
    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
    }
}

//Elimina un proyecto por su id
exports.eliminarProyecto = async (req, res) => {
    try {
       
       let proyecto = await Proyecto.findById(req.params.id);

       if(!proyecto) {
           return res.status(404).json({msg: 'Proyecto no encontrado'}) //el el curso nunca paso aqui se siguio en el servidor
       }
      
       if(proyecto.creador.toString() !== req.usuario.id){
           return res.status(401).json({msg: 'No autorizado'})
       } 

       //eliminar el proyecto
       proyecto = await Proyecto.findOneAndRemove({_id: req.params.id});
       res.json({proyecto, msg: 'Proyecto eliminado'})
       //actualizar
   } catch (error) {
       console.log(error)
       res.status(500).send('Error en el servidor')
   }

}
