const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Subject = require("../models/subject");

// GET all subjects
router.get('/subject', async (req, res, next) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (err) {
        next(err);
    }
});

module.exports = router;