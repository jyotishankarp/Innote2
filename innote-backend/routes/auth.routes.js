const express = require("express");
const router = express.Router();
const validator = require('express-joi-validation').createValidator({})
const ctrl = require('../controllers/auth.controller');


//Auth Routes
router.post('/login',ctrl.SignIn);
router.post('/signup');
router.post('/forgotPassword');
router.post('/submitPassword');

module.exports = router