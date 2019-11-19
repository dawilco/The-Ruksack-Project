const express = require('express');
const routes = require('../routes');

const server = express();
server.use(express.json());

// maybe need to move to a middleware
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('Access-Control-Allow-Methods',' POST, PUT, GET, OPTIONS');
    next();
});

server.use('/', routes);

module.exports = server;
