const Router = require('express');
const { 
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
} = require('../controllers/doctor.controller');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { check } = require('express-validator');
const { fiedlValidator } = require('../middlewares/field-validator');
const { imageExtValidator } = require('../middlewares/image-validator');

const doctorRouter = Router();

doctorRouter.get('/', jwtValidator, getDoctors);

doctorRouter.post('/',
    [
        jwtValidator,
        check('name', 'The doctor name is required').isString().notEmpty(),
        check('hospital', 'The hospital id is required').isMongoId(),
        fiedlValidator,
        imageExtValidator
    ],
    createDoctor
);

doctorRouter.put('/:id',
    [
        jwtValidator,
        check('name', 'The doctor name is required').isString().notEmpty(),
        check('hospital', 'The hospital id is required').isMongoId(),
        fiedlValidator,
        imageExtValidator
    ],
    updateDoctor
);

doctorRouter.delete('/:id', jwtValidator, deleteDoctor);

module.exports = {
    doctorRouter
};