const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors')

//crear el servidor
const app = express();


// Conectar a la base de datos
conectarDB();

//habilitar cors
app.use(cors());

// habilitar express.json(), nos va permitir datos que el usuario coloque, esto es equivalente al uso de body parser
app.use(express.json({extended: true}))



//puesto de la app
const PORT = process.env.PORT || 4000; //process.env.PORT HEROKU TE VA A ASIGNAR EL PUERTO QUE TENGA DSIPONIBLE

//Importar rutas

app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))

//definir la pagina principal respondemos a la peticion que que esta haciendo el cliente con el verbo http correpondiente .get
/*
app.get('/', (req, res)=> {
    res.send('Hola Mundo')
});
*/

//arrancar la app
app.listen(PORT, ()=> {
    console.log(`el servidor esta funcionando en el puerto ${PORT}`);
});