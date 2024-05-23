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

router.post('/update-schedules', async (req, res) => {
  const { semester, term } = req.body;

  if (!semester || !term) {
    return res.status(400).json({ error: 'Semester and term fields are required' });
  }

  try {
    const result = await Schedule.updateMany(
      {},
      { $set: { 'schedule.semester': semester, 'schedule.term': term } },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'All schedules updated successfully', result });
  } catch (error) {
    console.error("Error updating schedules:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/delete-subject', async (req, res) => {
  const { cs_id, major_id } = req.body;

  if (!cs_id || !major_id) {
    return res.status(400).json({ error: 'cs_id and major_id are required' });
  }

  try {
    const schedule = await Schedule.findOne({ 'schedule.major_id': major_id });

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    const subjectIndex = schedule.subject.findIndex(subject => subject.cs_id === cs_id);

    if (subjectIndex === -1) {
      return res.status(404).json({ error: 'Subject not found in schedule' });
    }

    schedule.subject.splice(subjectIndex, 1);

    await schedule.save();

    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/update-subjects', async (req, res) => {
  const { major_id, subjects } = req.body;

  if (!subjects) {
    return res.status(400).json({ error: 'Subjects field is required' });
  }

  try {
    const updatedSchedule = await Schedule.findOneAndUpdate(
      { 'schedule.major_id': major_id },
      { $push: { 'subject': { $each: subjects } } },
      { new: true, runValidators: true }
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
