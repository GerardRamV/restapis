const multer = require('multer');
const Productos = require('../models/Productos');

const generarId = () =>  Math.random().toString(32).substring(2) + Date.now().toString(32);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/');
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1];
        cb(null, generarId()+'.'+extension);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no valido'));
    }
};

const limits = {
    fileSize: 100000
};

const upload = multer({
    storage,
    fileFilter,
    limits
}).single('imagen');

exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({mensaje: error.message});
        }
        next();
    });
};

exports.nuevoProducto = async (req, res, next) => {
    try {
        const producto = new Productos(req.body);
        if (req.file) {
            producto.imagen = req.file.filename;
        }
        await producto.save();
        res.json({mensaje: 'Producto agregado'});
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.mostrarProducto = async (req, res, next) => {
    try {
        const {id} = req.params;
        const producto = await Productos.findById(id);
        if (!producto) {
            res.json({mensaje: 'Producto no existente'});
            next();
        }
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.actualizarProducto = async (req, res, next) => {
    try {
        const {id} = req.params;;

        const nuevoProducto = req.body;

        if (req.file) {
            nuevoProducto.imagen = req.file.filename;
        } else {
            const productoAnterior = await Productos.findById(id)
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        const producto = await Productos.findOneAndUpdate({_id: id}, nuevoProducto, {new: true});

        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.eliminarProducto = async (req, res, next) => {
    try {
        const {id} = req.params;
        const producto = await Productos.findOneAndDelete({_id: id});
        if (!producto) {
            res.json({mensaje: 'El producto no existe'});
            next();
        }
        if(producto.imagen){
            // const imagenAnterioPath = __dirname + `/../uploads/${producto.imagen}`;
            // fs.unlink( imagenAnterioPath, (error) => {
            //     if(error) {
            //         console.log(error);
            //     }
            //     return;
            // });
        }
        res.json({mensaje: 'El producto se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.buscarProducto = async (req, res, next) => {
    try {
        const {query} = req.params;
        const producto = await Productos.find({nombre: new RegExp(query, 'i')});
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
};