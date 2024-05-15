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

router.post('/building', (req, res, next) => {
    Building.create(req.body, (err, post) => {
        if(err) return next(err);
        res.json(post);
    })
})

module.exports=router