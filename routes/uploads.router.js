const Router = require('express');
const { 
    uploadImage,
    getImage
} = require('../controllers/uploads.controller');
const { imageExtValidator } = require('../middlewares/image-validator');

const uploadsRouter = Router();

uploadsRouter.post('/:collection/:id', imageExtValidator, uploadImage);
uploadsRouter.get('/:collection/:image', getImage);

module.exports = {
    uploadsRouter
};