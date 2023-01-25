const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req, res, next) => {
    try {
        const usuario = new Usuarios(req.body);
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash( usuario.password, salt);
        await usuario.save();
        res.status(200).json({mensaje: 'Usuario creado correctamente'});
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(500).json({mensaje: 'El correo ya cuenta con una cuenta'});
        }
        res.status(500).json({mensaje: 'Hubo un error'});
    }
};

exports.autenticarUsuario = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const usuario = await Usuarios.findOne({email});
        
        if (!usuario) {
            return res.status(401).json({mensaje: 'No se ha encontrado alguna cuenta con el correo ingresado'});
        } else {
            if (!bcrypt.compareSync(password, usuario.password)) {
                return res.status(401).json({mensaje: 'Password incorrecto'});
            } else {
                const token = jwt.sign({
                    email: usuario.email,
                    nombre: usuario.nombre,
                    _id: usuario._id
                }, 
                'LLAVESECRETA',
                {
                    expiresIn: '1h'
                });
                res.status(200).json({token});
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({mensaje: 'Hubo un error'});
    }
};