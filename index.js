const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routesAuth = require('./routes/auth');
const routesClientes = require('./routes/clientes');
const routesProductos = require('./routes/productos');
const routesPedidos = require('./routes/pedidos');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true
}).then(
    (m) => {
        console.log('Connected!');
        return m.connection;
    }
)
.catch(
    err => { 
        console.log(err);
    }
);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Permite conexion con otro servidor 
app.use(cors());

app.use(express.static('public'));

app.use('/', routesAuth());
app.use('/clientes', routesClientes());
app.use('/productos', routesProductos());
app.use('/pedidos', routesPedidos());

app.listen(process.env.PORT);