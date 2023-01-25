const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const auth = require('../middleware/auth');

module.exports = function () {

    router.post('/', clienteController.nuevoCliente);
    router.get('/', auth, clienteController.mostrarClientes);
    router.get('/:id', clienteController.mostrarCliente);
    router.put('/:id', clienteController.actualizarCliente);
    router.delete('/:id', clienteController.eliminarCliente);

    return router;
};