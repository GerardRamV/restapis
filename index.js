const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routesAuth = require('./routes/auth');
const routesClientes = require('./routes/clientes');
const routesProductos = require('./routes/productos');
const routesPedidos = require('./routes/pedidos');

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://gerardRam:eQUOHT3kHS9mxHpv@cluster0.qvukjrv.mongodb.net/restapis', {
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

app.listen(4000);