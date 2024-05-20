const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Building = require("../models/building");

router.get('/building', (req, res, next) => {
    Building.find((err, building) => {
        if(err) return next(err);
        res.json(building);
    })
})

module.exports=router