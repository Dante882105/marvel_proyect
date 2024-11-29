'use strict'
const Route = require("./constants/constants");
var routerLink = Route.data.dataCors;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const nuxeoRoutes = require('./routes/routes.js');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
app.use(cors(routerLink));

//rutas
app.use('/api', nuxeoRoutes);

module.exports = app;