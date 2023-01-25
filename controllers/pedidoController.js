const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req, res, next) => { 
    try {
        const pedido = new Pedidos(req.body);
        await pedido.save();
        res.json({mensaje: 'Pedido agregado correctamente'});
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({path: 'pedido.producto', model: 'Productos'});
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.mostrarPedido = async (req, res, next) => {
    try {
        const {id} = req.params;
        const pedido = await Pedidos.findById(id).populate('cliente').populate({path: 'pedido.producto', model: 'Productos'});
        if (!pedido) {
            res.json({mensaje: 'Pedido no existente'});
        }
        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.actualizarPedido = async (req, res, next) => {
    try {
        const {id} = req.params;
        const pedido = await Pedidos.findOneAndUpdate({_id: id}, req.body, {new: true});
        if (!pedido) {
            res.json({mensaje: 'El pedido no existe'});
            next();
        }
        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.eliminarPedido= async (req, res, next) => {
    try {
        const {id} = req.params;
        const pedido = await Pedidos.findOneAndDelete({_id: id});
        if (!pedido) {
            res.json({mensaje: 'El pedido no existe'});
            next();
        }
        res.json({mensaje: 'El pedido se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};