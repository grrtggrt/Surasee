const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Schedule = require('../models/Schedule');

// GET all schedules
router.get('/schedule', async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Schedule.find().select('subject');
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/update-subjects', async (req, res) => {
  const { major_id, subjects } = req.body;

  try {
    // อัปเดต subjects ในโมเดล Schedule
    const updatedSchedule = await Schedule.findOneAndUpdate(
      { major_id: major_id },
      { $set: { subject: subjects } },
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    res.status(200).json(updatedSchedule);
  } catch (error) {
    console.error("Error updating subjects:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  


module.exports = router;
