const { response }   = require("express");
const UserSchema     = require("../models/user.model");
const DoctorSchema   = require("../models/doctor.model");
const HospitalSchema = require("../models/hospital.model");

const getAllSearch = async(req, res = response) => {

    // Capturamos la consulta que viene en la ruta
    const search = req.params.search;
    // Para hacer coincidir la busqueda con un patron
    const regSearch = new RegExp(search, 'i');

    try {

        const [ users, doctors, hospitals ] = await Promise.all([
            UserSchema.find({name : regSearch}),
            DoctorSchema.find({name : regSearch}),
            HospitalSchema.find({name : regSearch})
        ]);
        
        return res.status(200).json({
            ok  : true,
            msj : 'Todo consultado correctamente!',
            users,
            doctors,
            hospitals
        });
    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al consultar!',
            error
        });
    };
};

const getAllCollectionSearch = async(req, res = response) => {

    const collection = req.params.collection;

    // Capturamos la consulta que viene en la ruta
    const search = req.params.search;
    // Para hacer coincidir la busqueda con un patron
    const regSearch = new RegExp(search, 'i');

    try {
        const collections = {
            'users'     :  UserSchema.find({name : regSearch}),
            'doctors'   :  DoctorSchema.find({name : regSearch}),
            'hospitals' :  HospitalSchema.find({name : regSearch})
        };

        const searchResults = await collections[collection];
        
        return res.status(200).json({
            ok  : true,
            msj : 'Todo consultado correctamente!',
            searchResults
        });
    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al consultar!',
            error
        });
    };
};

module.exports = {
    getAllSearch,
    getAllCollectionSearch
};