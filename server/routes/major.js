const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Major = require("../models/major");

router.get('/major', (req, res, next) => {
    Major.find((err, major) => {
        if(err) return next(err);
        res.json(major);
    })
})

module.exports=router