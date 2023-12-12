const express = require('express');
const cors = require('cors');

// Importamos las variables de entorno
require('dotenv').config();
const { dbConnection } = require('./database/database.config');

// Importamos las rutas
const { userRouter } = require('./routes/user.routes');
const { authRouter } = require('./routes/auth.router');
const { hospitalRouter } = require('./routes/hospital.router');
const { doctorRouter } = require('./routes/doctor.router');
const { allRouter } = require('./routes/all.router');
const { uploadsRouter } = require('./routes/uploads.router');
const fileUpload = require('express-fileupload');

// Habilitamos el server
const app = express();

// Permitimos peticiones de multiples usuarios
app.use(cors());

// carpeta publica
app.use(express.static('public'));

// Habilitamos la recibida de datos en la peticion http tipo body json
app.use(express.json());

// Habilitamos la carga de imagenes
app.use(fileUpload());

// Coneccion a base de datos
dbConnection(); 

// Rutas de mi aplicacion

app.use('/api/users', userRouter);
app.use('/api/hospitals', hospitalRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/all', allRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/login', authRouter);

app.listen(process.env.PORT, ()=>{
    console.log("Server is Online, PORT: ", process.env.PORT);
});