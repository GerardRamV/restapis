const Clientes = require('../models/Clientes');

exports.nuevoCliente = async (req, res, next) => {
    try {
        const cliente = new Clientes(req.body);
        await cliente.save();
        res.json({mensaje: 'Se agrego un nuevo cliente'});
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.mostrarCliente = async (req, res, next) => {
    try {
        const {id} = req.params;
        const cliente = await Clientes.findById(id);
        if (!cliente) {
            res.json({mensaje: 'El cliente no existe'});
            next();
        }
        res.json(cliente);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.actualizarCliente = async (req, res, next) => {
    try {
        const {id} = req.params;
        const cliente = await Clientes.findOneAndUpdate({_id: id}, req.body, {new: true});
        if (!cliente) {
            res.json({mensaje: 'El cliente no existe'});
            next();
        }
        res.json(cliente);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.eliminarCliente = async (req, res, next) => {
    try {
        const {id} = req.params;
        const cliente = await Clientes.findOneAndDelete({_id: id});
        if (!cliente) {
            res.json({mensaje: 'El cliente no existe'});
            next();
        }
        res.json({mensaje: 'El cliente se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};