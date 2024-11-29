'use strict'
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var contactUsSchema = new Schema(
    {
        name: String,
        identification: String,
        country: String,
        mail: String,
        message: String
    },
    {
        collection: "contactUs",
        versionKey: false
    }
);

module.exports = mongoose.model("Client", contactUsSchema);