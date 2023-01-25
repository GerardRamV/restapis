const express = require('express');
const router = express.Router();

const productoController = require('../controllers/productoController');

module.exports = function () {
    router.post(
        '/',
        productoController.subirArchivo,
        productoController.nuevoProducto
    );
    router.get('/', productoController.mostrarProductos);
    router.get('/:id', productoController.mostrarProducto);
    router.put(
        '/:id',
        productoController.subirArchivo,
        productoController.actualizarProducto
    );
    router.delete('/:id', productoController.eliminarProducto);

    router.post('/busqueda/:query', productoController.buscarProducto);

    return router;
};