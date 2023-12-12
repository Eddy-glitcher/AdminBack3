const { response } = require("express");

const imageExt = (image) => {
    const imageArr = image.split('.');
    const imgExt = imageArr[imageArr.length-1].toLowerCase();
    return imgExt;
};

const imageExtValidator = (req, res = response, next) => {
    let image = req.body.image;
    try {
        const imageExts = ['jpg', 'jpeg', 'png', 'avif'];

        // Extraemos la extension de la imágen;
        if(image){
            if(!imageExts.includes(imageExt(image))){
                return res.status(400).json({
                    ok  : false,
                    msj : 'La imágen enviada no es válida, debe ser: jpg/jpeg/png/avif'
                });
            };
        }

        // Extraemos la extencion de la imagen, en caso de que venga una imágen.
        if(req.files){
            const imageFile = req.files.image;
            if(!imageExts.includes(imageExt(imageFile.name))){
                return res.status(400).json({
                    ok  : false,
                    msj : 'La imágen enviada no es válida, debe ser: jpg/jpeg/png/avif'
                });
            };
        };

        next();
    } catch (error) {
        return res.status(500).json({
            ok  : false,
            msj : 'Error al validar la extencion de la imágen!'
        });
    };
};

module.exports = {
    imageExtValidator
};