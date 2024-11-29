'use strict'
const Route = require("../constants/constants");
var routerLink = Route.data.javaRoute; 
var User = require("../models/model.js");
var Client = require("../models/contactus.js");

var child = require("child_process").exec;

function hashPass(password, callback = (result) => {}) {
    var exec = child;
    exec(`java ${routerLink} ${password}`, function(error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }else{
        callback(stdout.toString())
        return stdout;
        }
    });
};

var controller = {

    registerUser: async (req, res)=>{
        var user = new User();
        var params = req.body;

        user.firstName = params.firstName;
        user.lastName = params.lastName;
        user.identification = params.identification;
        user.email = params.email;
        user.username = params.username;
        user.password = params.password;
        user.save((err, userStored)=>{
            if(err) return res.status(500).send({
                message: 'Se presentó un error',
                status: res.status
            });
            if(!userStored) res.status(400).send({ 
                message: "Failed to save user",
                status: res.status
            });
            res.status(200).send({
                message: "Your registration was successful",
                status: res.status
            })
        })
        /*var crypt = hashPass(params.password, function(result){
            user.password = result;
            user.save((err, userStored)=>{
                if(err) return res.status(500).send({ message: "Error al guardar "+err});
                if(!userStored) res.status(404).send({ message: "Failed to save user"});
                res.status(200).send({ message : 'Su registro fue exitoso'});
            });
        });*/
    },

    findUser: function(req, res){
        let username = req.params.username;

        User.findOne({username: username}, function (err, user){
            if(!user){
                res.status(200).send({
                    message :"Valid user, you can continue",
                    data: user,
                    exist: false,
                });
                return "Usuario valido";
            }else if(user){
                res.status(200).send({
                    message: "The user already exists in our database, please try a different one",
                    data: user,
                    exist: true,
                });
                return "mail not allowed";
            }else if(err){
                res.status(500).send({
                    message: "An error occurred, please try again later",
                    data: err
                });
                return "Error";
            };
        });
    },

    findMail: function(req, res){

        let mail = req.params.mail;

        User.findOne({email: mail}, function (err, email){
            if(!email){
                res.status(200).send({
                    message :"Valid email, you can continue",
                    data: email,
                });
            }else if(email){
                res.status(200).send({
                    message: "The email already exists in our database, enter a different email",
                    data: email,
                    exist: true,
                });
            }else if(err){
                res.status(500).send({
                    message: "Se presentó un error, vuelve a intentarlo más tarde",
                    data: err,
                });
            };
        });
    },

    contact: function (req,res){
        var client = new Client();
        var params = req.body;
        client.name = params.name;
        client.identification = params.identification;
        client.country = params.country;
        client.mail = params.mail;
        client.message = params.message;
        client.save((err, clientStored)=>{
            if(err) return res.status(500).send({ message: "Failed to save record"+err});
            if(!clientStored) res.status(404).send({ message: "Sorry, we couldn't save your contact"});
            res.status(200).send({ message: 'Thank you for contacting us, we will contact you shortly'});
        });
    },

    authenticate: async function(req,res){
        let username = req.params.username;
        let password = req.params.password;

        User.findOne({username: username}, function (err, user){

            if(!user){
                res.status(404).send({
                    message: "User not found, try again",
                    exist: false,
                    data: user
                })
            }else if(err){
                res.status(500).send({
                    exist: false,
                    message: "An error occurred, please try again late",
                    data: err
                });
            }else{
                if(user.password === password){
                    return res.status(200).send({
                        message: "Welcome "+user.username,
                        user: user.username,
                        exist: true
                    })
                }else if(user.password != password){
                    return res.status(404).send({
                        message: "Could not login, please check your password",
                        exist: false
                    })
                }
            }
        });
    }
};

module.exports = controller;