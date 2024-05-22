const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Schedule = require('../models/schedule');

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

router.post('/update-subjects-room', async (req, res) => {
  const dataToSave = req.body;

  try {
    for (const roomData of dataToSave) {
      if (!roomData || !roomData.room_id) {
        continue;
      }

      const { major_id, cs_id, build_name, room_id, seat, timeStart, timeEnd, amount, section, droppableIdRoom } = roomData;

      const schedule = await Schedule.findOne({ 'schedule.major_id': major_id });
      if (!schedule) {
        return res.status(404).json({ error: `Schedule with major_id ${major_id} not found` });
      }

      const subject = schedule.subject.find(sub => sub.cs_id === cs_id);
      if (!subject) {
        return res.status(404).json({ error: `Subject with cs_id ${cs_id} not found in schedule` });
      }

      const roomDetail = {
        build_name,
        room_id,
        seat,
        timeStart,
        timeEnd,
        amount,
        section,
        droppableIdRoom,
      };
      subject.room.push(roomDetail);

      await schedule.save();
    }

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
