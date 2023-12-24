const { response } = require("express");
const UserSchema   = require("../models/user.model");
const bcrypt       = require("bcrypt");
const { jwtGenerator } = require("../helpers/jwt-generator");
const { verifyGoogleToken } = require("../helpers/google-verify");

const logIn = async(req, res = response) => {

    const { email, password } = req.body;

    try {
    
        const userDb = await UserSchema.findOne({email});

        if(!userDb){
            return res.status(404).json({
                ok  : false,
                msj : 'Credenciales erroneas!'
            });
        };

        // Comparamos contraseñas
        const isEqualPassword = bcrypt.compareSync(password, userDb.password);

        if(!isEqualPassword){
            return res.status(400).json({
                ok  : false,
                msj : 'Credenciales erroneas!'
            });
        };

        // Generamos el token
        const uid = userDb._id;
        const token = await jwtGenerator(uid);

        return res.status(200).json({
            ok  : true,
            msj : 'Sesión Iniciada Correctamente',
            token
        });
    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al Iniciar Sesión'
        });
    };
};

const logInWhitGoogle = async(req, res = response) => {
    let user;
    try {
    
        const  { name, email, picture } = await verifyGoogleToken(req.body.token);
        // Verificar si el usuario ya existe!
        const userDb = await UserSchema.findOne({email});

        if(!userDb){
            user = new UserSchema({
                name,
                email,
                password : '@@@',
                image : picture,
                google : true
            });
        }else{
            user = userDb; 
            user.google = true;
        };

        // Guardamos el nuevo usuario en la db!
        await user.save();

        // Generamos el Jwt
        const token = await jwtGenerator(user._id);

        return res.status(200).json({
            ok  : true,
            msj : 'Sesion con google iniciada correctamente!',
            user,
            token
        });

    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al iniciar sesión con google!'
        });
    };
};

const renewToken = async(req, res = response) => {
    const uid = req.uid;
    try {

        const token = await jwtGenerator(uid);

        // Consultar el usuario al que corresponde ese uid del token
        const user = await UserSchema.findById(uid);

        return res.status(200).json({
            ok  : true,
            msj : 'Token renovado!',
            token,
            user
        });
    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al renovar el Token!'
        });
    };
};

module.exports = {
    logIn,
    logInWhitGoogle,
    renewToken
};