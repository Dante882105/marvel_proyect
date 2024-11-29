'use strict'
var express = require("express");
var controller = require("../controllers/controller.js");


var router = express.Router();

router.post('/register-user', controller.registerUser);
router.get('/find-user/:username?', controller.findUser);
router.get('/find-mail/:mail', controller.findMail);
router.post('/contact-us', controller.contact);
router.get('/authenticate/:username/:password', controller.authenticate);

module.exports = router;