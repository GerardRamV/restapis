const express = require('express');
const router = express.Router();

const pedidoController = require('../controllers/pedidoController');

module.exports = function () {

    router.post('/', pedidoController.nuevoPedido);
    router.get('/', pedidoController.mostrarPedidos);
    router.get('/:id', pedidoController.mostrarPedido);
    router.put('/:id', pedidoController.actualizarPedido);
    router.delete('/:id', pedidoController.eliminarPedido);

    return router;
};