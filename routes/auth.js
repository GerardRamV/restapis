const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');


module.exports = function () {
    
    router.post('/crear-cuenta', usuarioController.registrarUsuario);

    router.post('/iniciar-sesion', usuarioController.autenticarUsuario);

    return router;
};