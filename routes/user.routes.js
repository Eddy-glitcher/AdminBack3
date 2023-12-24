const Router = require('express');
const { check } = require('express-validator');
const { 
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user.controller');
const { fiedlValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { imageExtValidator } = require('../middlewares/image-validator');

const userRouter = Router();

// Listar Usuarios
userRouter.get('/', getUsers );

// Crear Usuarios
userRouter.post('/',
    [  
        check('name',    'The name is Required').isString().notEmpty(),
        check('email',   'The email is Required').isEmail(),
        check('password','The password is Required').isString().notEmpty(),
        fiedlValidator,
        imageExtValidator
    ],
    createUser
);

userRouter.put('/:id',
    [
        jwtValidator,
        check('name',  'The name is Required').isString().notEmpty(),
        check('email', 'The email is Required').isEmail(),
        check('role',  'The role is Required').isString().notEmpty(),
        fiedlValidator,
        imageExtValidator
    ],
    updateUser
);

userRouter.delete('/:id', jwtValidator, deleteUser );

module.exports = {
    userRouter
};