const { response }   = require("express");
const DoctorSchema   = require("../models/doctor.model");
const HospitalSchema = require("../models/hospital.model");

const getDoctors = async(req, res = response) => {
    try {
        const doctors = await DoctorSchema.find();

        return res.status(200).json({
            ok  : true,
            msj : 'Doctores consultados correctamente!',
            doctors
        });
    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al consultar los doctores!'
        });
    };
};

const createDoctor = async(req, res = response) => {
    
    const hid = req.body.hospital;
    
    try {
        // Verificamos que el hospital exista
        const isHospitalExists = await HospitalSchema.findById(hid);

        if(!isHospitalExists){
            return res.status(404).json({
                ok  : false,
                msj : 'No existe un hospital con ese id!'
            });
        };

        const doctor = new DoctorSchema({user : req.uid, ...req.body});
        await doctor.save();

        return res.status(201).json({
            ok  : true,
            msj : 'Doctor Creado correctamente!',
            doctor
        });
    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al crear el doctor!'
        });
    };
};

const updateDoctor = async(req, res = response) => {
    
    const hid = req.body.hospital;
    const did = req.params.id;

    
    try {

        // Verificar que el doctor exista
        const isDoctorExists = await DoctorSchema.findById(did);

        if(!isDoctorExists){
            return res.status(404).json({
                ok  : false,
                msj : 'No existe un doctor con ese id!'
            });
        };

        // Verificar que el hospital exista
        const isHospitalExists = await HospitalSchema.findById(hid);

        if(!isHospitalExists){
            return res.status(404).json({
                ok  : false,
                msj : 'No existe un hospital con ese id!'
            });
        };

        const doctor = await DoctorSchema.findByIdAndUpdate(did, {user : req.uid, ...req.body});

        return res.status(201).json({
            ok  : true,
            msj : 'Doctor Actualizado correctamente!',
            doctor
        });
    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al actualizar el doctor!'
        });
    };
};

const deleteDoctor = async(req, res = response) => {
    
    const did = req.params.id;

    try {

        // Verificar que el doctor exista
        const isDoctorExists = await DoctorSchema.findById(did);

        if(!isDoctorExists){
            return res.status(404).json({
                ok  : false,
                msj : 'No existe un doctor con ese id!'
            });
        };

        const doctor = await DoctorSchema.findByIdAndDelete(did);

        return res.status(201).json({
            ok  : true,
            msj : 'Doctor Eliminado correctamente!',
            doctor
        });
    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al eliominar el doctor!'
        });
    };
};

// TODO : Validar extencion de imagenes para todo el crud
// TODO! : Hacer el Crud all
// TODO! : Manejar la subida de imágenes


module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
};