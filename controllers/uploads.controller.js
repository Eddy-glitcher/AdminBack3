const { response }      = require("express");
const { v4: uuid }      = require('uuid');
const fs                = require('fs');
const { updateImageDb } = require("../helpers/update-image");
const path = require("path");

const uploadImage = async(req, res = response) => {

    const id         = req.params.id;
    const collection = req.params.collection;
    const imageRef   = req.files.image;

    try {

        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({
                ok  : false,
                msj : 'Error: No se ha cargado ninguna imagen!'
            });
        };

        // Destructuramos la imagen para obtener su extención
        const imageArr  = imageRef.name.split('.');
        const imageExt  = imageArr[imageArr.length-1].toLowerCase();

        // Generamos la imagen con el id unico para cada una
        const uuidImage  = `${uuid()}.${imageExt}`;
        const uploadPath = `./uploads/${collection}/${uuidImage}`;
        
        // Actualizamos la imagen en la db
        updateImageDb(collection, uuidImage, id);

        imageRef.mv(uploadPath, function(err){
            if(err){
                return res.status(500).json({
                    ok  : false,
                    msj : 'Error al cargar la imágen, intentelo de nuevo!',
                    err
                });
            };
        });

        return res.status(200).json({
            ok        : true,
            msj       : 'Imagen subida correctamente!',
            imageName : uuidImage
        });
        
    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al subir la imagen!'
        });
    };
};

const getImage = async(req, res = response) => {

    const collection = req.params.collection;
    const image      = req.params.image;

    const searchImagePath = `../uploads/${collection}/${image}`;

    const pathImage = path.join(__dirname, searchImagePath);

    if(fs.existsSync(pathImage)){
        res.sendFile(pathImage);
    }else{
        const imageNotFound = path.join(__dirname, `../uploads/image-not-found/no-img.jpg`);
        res.sendFile(imageNotFound);
    };
};

module.exports = {
    uploadImage,
    getImage
};