const express = require("express");
const router = express.Router();
const Subject = require("../models/subject");
const Major = require("../models/major");
const Building = require("../models/building");

router.delete("/subject", async (req, res) => {
  try {
    const { items } = req.body;

    await Subject.deleteMany({ cs_id: { $in: items } });
    res.status(200).send("Subjects deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting subjects");
  }
});

router.delete("/major", async (req, res) => {
  try {
    const { items } = req.body;

    const conditions = items.map((item) => ({
      major_id: item.major_id,
      major_grade: item.major_grade,
    }));

    await Major.deleteMany({ $or: conditions });

    res.status(200).send("Majors deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting majors");
  }
});

router.delete("/building", async (req, res) => {
  try {
    const { items } = req.body;

    const conditions = items.map((item) => ({
      room_id: item.room_id,
      seat: item.seat,
    }));

    console.log("Conditions to delete:", conditions);

    await Building.deleteMany({ $or: conditions });

    res.status(200).send("Buildings deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting buildings");
  }
});

module.exports = router;
