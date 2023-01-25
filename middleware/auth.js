// @ts-check
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return res.status(401).json({mensaje: 'Acceso no valido'})
    }

    const token = authHeader.split(' ')[1];
    let revisarToken;
    
    try {
        revisarToken = jwt.verify(token, "LLAVESECRETA");
    } catch (error) {
        console.log(error);
        return res.status(500).json({mensaje: 'Error token'});
    }

    if (!revisarToken) {
        return res.status(401).json({mensaje: 'Acceso no valido'})
    }

    next();
};