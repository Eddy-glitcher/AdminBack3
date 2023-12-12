const { response } = require("express");
const UserSchema   = require("../models/user.model");
const bcrypt       = require('bcrypt');

const getUsers = async(req, res = response) => {
    try {
        const users = await UserSchema.find();

        return res.status(200).json({
            ok  : true,
            msj : 'Usuarios obtenidos con éxito!',
            users
        });
    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al obtener los usuarios!'
        });
    };
};

const createUser = async(req, res = response) => {
    const { email, password } = req.body;
    try {

        // Consultamos si el email ya existe en la db
        const dbUser = await UserSchema.findOne({email});

        if(dbUser){
            return res.status(400).json({
                ok  : false,
                msj : 'El email ya ha sido ocupado, pruebe con otro!' 
            });
        };

        // Encriptamos contraseña
        const passwordSalt   = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, passwordSalt);

        // Creamos el usuario
        const user = new UserSchema(req.body);
        // Asignamos la contraseña hasheada
        user.password = hashedPassword;
        await user.save();
        
        return res.status(201).json({
            ok  : true,
            msj : 'Usuario creado con éxito!',
            user,
            creator : req.uid
        });
    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al crear el usuario!'
        });
    };
};

const updateUser = async(req, res = response) => {
    const uid = req.params.id;
    try {

        // Consultamos si usuario existe en la db
        const dbUser = await UserSchema.findById(uid);

        if(!dbUser){
            return res.status(404).json({
                ok  : false,
                msj : 'No existe un usuario con ese id en la db!'
            });
        };

        // Actualizamos el usuario
        const user = await UserSchema.findByIdAndUpdate(uid, req.body);
        await user.save();

        return res.status(200).json({
            ok  : true,
            msj : 'Usuario actualizado con éxito!',
            user
        });

    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al actualizar el usuario!'
        });
    };
};

const deleteUser = async(req, res = response) => {
    const uid = req.params.id;
    try {

        // Consultamos si usuario existe en la db
        const dbUser = await UserSchema.findById(uid);

        if(!dbUser){
            return res.status(404).json({
                ok  : false,
                msj : 'No existe un usuario con ese id en la db!'
            });
        };

        // Eliminamos el usuario
        const user = await UserSchema.findByIdAndDelete(uid);

        return res.status(200).json({
            ok  : true,
            msj : 'Usuario Eliminado con éxito!',
            user
        });

    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al eliminar el usuario!'
        });
    };
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};