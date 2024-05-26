const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authController = require("../controllers/authController");

router.post('/login',authController.login);

module.exports=router