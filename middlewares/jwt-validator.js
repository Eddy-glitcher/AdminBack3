const { response } = require("express");
const jwt          = require("jsonwebtoken");

const jwtValidator = (req, res = response, next) => {
    const token = req.headers.token;
    try {

        if(!token){
            return res.status(400).json({
                ok  : true,
                msj : 'No se ha recibido ningún token!' 
            });
        };
        
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al verificar el token, vencido o erroneo!'
        });
    };
};

module.exports = {
    jwtValidator
};