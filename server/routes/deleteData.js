const express = require("express");
const router = express.Router();
const Subject = require("../models/subject");
const Major = require("../models/major");
const Building = require("../models/building");
const Schedule = require("../models/schedule");
const FileStatus = require("../models/FileStatus")

router.delete("/schedule", async (req, res) => {
  try {
    const { items } = req.body;
    console.log("Conditions to delete:", items);

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items to delete" });
    }

    const result = await Schedule.deleteMany({
      $or: items.map((item) => ({
        "schedule.major_id": item.major_id,
        "schedule.major_grade": item.major_grade,
      })),
    });

    res.status(200).json({ message: "Schedules deleted successfully", result });
  } catch (error) {
    console.error("Error deleting schedules:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/major", async (req, res) => {
  try {
    const { items } = req.body;
    console.log("Conditions to delete:", items);

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items to delete" });
    }

    const result = await Major.deleteMany({
      $or: items.map((item) => ({
        major_id: item.major_id,
        major_grade: item.major_grade,
      })),
    });

    res.status(200).json({ message: "Majors deleted successfully", result });
  } catch (error) {
    console.error("Error deleting majors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/building", async (req, res) => {
  try {
    const { items } = req.body;
    console.log("Conditions to delete:", items);

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items to delete" });
    }

    const result = await Building.deleteMany({
      $or: items.map((item) => ({
        room_id: item.room_id,
        seat: item.seat,
      })),
    });

    res.status(200).json({ message: "Buildings deleted successfully", result });
  } catch (error) {
    console.error("Error deleting buildings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/subject", async (req, res) => {
  try {
    const { items } = req.body;
    console.log("Conditions to delete:", items);

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items to delete" });
    }

    const result = await Subject.deleteMany({
      cs_id: { $in: items },
    });

    res.status(200).json({ message: "Subjects deleted successfully", result });
  } catch (error) {
    console.error("Error deleting subjects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/FileStatus", async (req, res) => {
  try {
    await FileStatus.deleteMany({});
    res.status(200).send({ message: "All file status deleted" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
