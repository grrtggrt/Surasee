const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Subject = require("../models/subject");

router.get('/subject', (req, res, next) => {
    Subject.find((err, subject) => {
        if(err) return next(err);
        res.json(subject);
    })
})

router.post('/subject', (req, res, next) => {
    Subject.create(req.body, (err, post) => {
        if(err) return next(err);
        res.json(post);
    })
})

module.exports=router