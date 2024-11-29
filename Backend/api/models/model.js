"use strict"
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var nuxeoSchema = new Schema(
    {
        firstName: String,
        lastName:String,
        password:String,
        identification:String,
        email:String,
        username:String
    },
    {
        collection: "userDirectory",
        versionKey: false
    }
);

module.exports = mongoose.model('User', nuxeoSchema);