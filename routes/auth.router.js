const Router = require('express');
const { 
    logIn,
    logInWhitGoogle,
    renewToken,
} = require('../controllers/auth.controller');
const { jwtValidator } = require('../middlewares/jwt-validator');

const authRouter = Router();

authRouter.post('/', logIn);
authRouter.post('/google', logInWhitGoogle);
authRouter.get('/renew', jwtValidator, renewToken);

module.exports = {
    authRouter
};