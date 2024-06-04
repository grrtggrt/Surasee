const express = require('express');
const router = express.Router();
const FileStatus = require('../models/FileStatus');

router.post('/uploadFileStatus', async (req, res) => {
  const { name, table, time } = req.body;
  try {
    const newFileStatus = new FileStatus({ name, table, time });
    await newFileStatus.save();
    res.status(201).json(newFileStatus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route สำหรับการดึงข้อมูล
router.get('/FileStatus', async (req, res) => {
  try {
    const fileStatuses = await FileStatus.find();
    res.status(200).json(fileStatuses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
