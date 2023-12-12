const Router = require('express');
const { 
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
} = require('../controllers/hospitals.controller');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { check } = require('express-validator');
const { fiedlValidator } = require('../middlewares/field-validator');
const { imageExtValidator } = require('../middlewares/image-validator');

const hospitalRouter = Router();

hospitalRouter.get('/', jwtValidator, getHospitals);

hospitalRouter.post('/',
    [   
        jwtValidator,
        check('name', 'The hospital name is required').isString().notEmpty(),
        check('image', 'The hospital image is required').isString().notEmpty(),
        fiedlValidator,
        imageExtValidator
    ],
    createHospital
);

hospitalRouter.put('/:id',
    [   
        jwtValidator,
        check('name', 'The hospital name is required').isString().notEmpty(),
        check('image', 'The hospital image is required').isString().notEmpty(),
        fiedlValidator,
        imageExtValidator
    ],
    updateHospital
);

hospitalRouter.delete('/:id', jwtValidator, deleteHospital);

module.exports = {
    hospitalRouter
};  