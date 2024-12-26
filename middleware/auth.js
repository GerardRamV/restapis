// @ts-check
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {

    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return res.status(401).json({mensaje: 'Acceso no valido'})
    }

    const token = authHeader.split(' ')[1];
    let revisarToken;
    
    try {
        const secret = process.env.SECRET;
        if (!secret) {
            return res.status(500).json({mensaje: 'Error token'});
        }
        revisarToken = jwt.verify(token, secret);
    } catch (error) {
        console.log(error);
        return res.status(500).json({mensaje: 'Error token'});
    }

    if (!revisarToken) {
        return res.status(401).json({mensaje: 'Acceso no valido'})
    }

    next();
};