const Router = require('express');
const { 
    getAllSearch,
    getAllCollectionSearch
} = require('../controllers/all.controller');
const { jwtValidator } = require('../middlewares/jwt-validator');

const allRouter = Router();

allRouter.get('/:search', jwtValidator, getAllSearch);
allRouter.get('/:collection/:search', jwtValidator, getAllCollectionSearch);

module.exports = {
    allRouter
};