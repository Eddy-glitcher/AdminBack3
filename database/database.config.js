const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB ONLINE!');
    } catch (error) {
        console.log('Error al conectar al a base de datos!');
    };
};  

module.exports = {
    dbConnection
};