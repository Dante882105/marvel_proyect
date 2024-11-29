'use strict'
const Route = require("./api/constants/constants");
var app = require('./api/app.js');
var port = 3700;
const uri = "mongodb://127.0.0.1:27017/marvel_db";

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(uri)
    .then( ()=> {
        console.log('CONECTADO A MONGO');
        app.listen(port, ()=>{
            console.log("servidor corriendo correctamente en: " + uri)
        });
    })
    .catch((err)=> console.log("Error "+err))