const { response }   = require("express");
const HospitalSchema = require("../models/hospital.model");

const getHospitals = async(req, res = response) => {
    try {

        const hospitals = await HospitalSchema.find();

        return res.status(200).json({
            ok  : true,
            msj : 'Hospitales consultados Correctamente!',
            hospitals
        });
    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Hospitales consultados Correctamente!',
            error
        });
    };
};

const createHospital = async(req, res = response) => {
    try {

        const hospital = new HospitalSchema({user : req.uid, ...req.body});
        await hospital.save();

        return res.status(200).json({
            ok  : true,
            msj : 'Hospital Creado Correctamente!',
            hospital
        });
    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al crear el Hospital!',
            error
        });
    };
};

const updateHospital = async(req, res = response) => {
    const hid = req.params.id;
    try {

        const isHospitalExists = await HospitalSchema.findById(hid);

        if(!isHospitalExists){
            return res.status(200).json({
                ok  : false,
                msj : 'No existe un Hospital con ese id'
            });
        };

        const hospital = await HospitalSchema.findByIdAndUpdate(hid ,{user : req.uid, ...req.body}, { new : true });

        return res.status(200).json({
            ok  : true,
            msj : 'Hospital Actualizado Correctamente!',
            hospital
        });
    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al actualizar el Hospital!',
            error
        });
    };
};

const deleteHospital = async(req, res = response) => {
    const hid = req.params.id;
    try {

        const isHospitalExists = await HospitalSchema.findById(hid);

        if(!isHospitalExists){
            return res.status(200).json({
                ok  : false,
                msj : 'No existe un Hospital con ese id'
            });
        };

        const hospital = await HospitalSchema.findByIdAndDelete(hid);

        return res.status(200).json({
            ok  : true,
            msj : 'Hospital Eliminado Correctamente!',
            hospital
        });
    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al eliminar el Hospital!',
            error
        });
    };
};

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
};