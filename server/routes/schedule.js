const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schedule = require("../models/schedule");

// GET all schedules
router.get("/schedule", async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/subjects", async (req, res) => {
  try {
    const subjects = await Schedule.find().select("subject");
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/update-schedules", async (req, res) => {
  const { semester, term } = req.body;

  if (!semester || !term) {
    return res
      .status(400)
      .json({ error: "Semester and term fields are required" });
  }

  try {
    const result = await Schedule.updateMany(
      {},
      { $set: { "schedule.semester": semester, "schedule.term": term } },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "All schedules updated successfully", result });
  } catch (error) {
    console.error("Error updating schedules:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/delete-subject", async (req, res) => {
  const { cs_id, major_id, grade } = req.body;

  if (!cs_id || !major_id) {
    return res.status(400).json({ error: "cs_id and major_id are required" });
  }

  try {
    const schedule = await Schedule.findOne({
      "schedule.major_id": major_id,
      "schedule.major_grade": grade,
    });

    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    schedule.subject = schedule.subject.filter(
      (subject) =>
        subject.cs_id !== cs_id &&
        subject.major_id === major_id &&
        subject.grade === grade
    );

    await schedule.save();

    res.status(200).json({ message: "Subjects deleted successfully" });
  } catch (error) {
    console.error("Error deleting subjects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/delete-room", async (req, res) => {
  const roomsToDelete = req.body.rooms;

  try {
    const deletePromises = roomsToDelete.map(async (room) => {
      const { cs_id, major_id, grade, seat, room_id } = room;

      console.log(cs_id, major_id, grade, seat, room_id);

      const schedule = await Schedule.findOne({
        "schedule.major_id": major_id,
        "schedule.major_grade": grade,
      });

      if (!schedule) {
        throw new Error("Schedule not found");
      }

      const subject = schedule.subject.find((sub) => sub.cs_id === cs_id);
      if (!subject) {
        throw new Error("Subject not found in schedule");
      }

      const roomIndex = subject.room.findIndex(
        (room) => room.room_id === room_id
      );
      if (roomIndex === -1) {
        throw new Error("Room not found in subject");
      }

      if (subject.room[roomIndex].seat.join(",") !== seat.join(",")) {
        throw new Error("Seat does not match the provided room_id");
      }

      subject.amount += subject.room[roomIndex].amount;
      subject.room.splice(roomIndex, 1);

      await schedule.save();
    });

    await Promise.all(deletePromises);

    res
      .status(200)
      .json({ message: "All rooms deleted from subject successfully" });
  } catch (error) {
    console.error("Error deleting rooms from subject:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

router.post("/update-subjects", async (req, res) => {
  const { major_id, major_grade, subjects } = req.body;

  // ตรวจสอบว่า fields จำเป็นถูกส่งมาหรือไม่
  if (!subjects || !major_id || !major_grade) {
    return res.status(400).json({
      error: "ต้องระบุ fields major_ids, major_grades และ subjects",
    });
  }

  try {
    for (let i = 0; i < major_id.length; i++) {
      const currentMajorId = major_id[i];
      const currentMajorGrade = major_grade[i];

      let schedule = await Schedule.findOne({
        "schedule.major_id": currentMajorId,
        "schedule.major_grade": currentMajorGrade,
      });

      if (!schedule) {
        schedule = new Schedule({
          schedule: {
            major_id: currentMajorId,
            major_grade: currentMajorGrade,
            semester: "",
            term: "",
          },
          subject: [],
        });
      }

      subjects.forEach((subject) => {
        console.log(`โครงสร้าง Subject: `, JSON.stringify(subject, null, 2));
      });

      const subjectsToSave = subjects
        .filter((subject) => {
          const majorIdMatch = subject.major_id.includes(currentMajorId);
          const gradeMatch = subject.grade.includes(currentMajorGrade);
          console.log(
            `Subject ID: ${subject.cs_id}, Major ID Match: ${majorIdMatch}, Grade Match: ${gradeMatch}`
          );
          return majorIdMatch && gradeMatch;
        })
        .map((subject) => {
          const majorIndex = subject.major_id.findIndex(
            (id, index) =>
              id === currentMajorId &&
              subject.grade[index] === currentMajorGrade
          );
          console.log(
            `MajorIndex for major_id ${currentMajorId} and major_grade ${currentMajorGrade}: ${majorIndex}`
          );
          return {
            cs_id: subject.cs_id,
            cs_name_en: subject.cs_name_en,
            cs_name_th: subject.cs_name_th,
            grade: subject.grade[majorIndex],
            major_id: currentMajorId,
            amount: subject.amount[majorIndex],
            date: subject.date,
            timezone: subject.timezone,
            droppableIdSchedule: subject.droppableIdSchedule,
          };
        });

      schedule.subject.push(...subjectsToSave);
      await schedule.save();

      console.log(
        `Updated schedule for major_id: ${currentMajorId}, major_grade: ${currentMajorGrade}`
      );
    }
    res.status(200).json({ message: "Updated schedules successfully" });
  } catch (error) {
    console.error("Error updating subjects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/update-subjects-room", async (req, res) => {
  const dataToSave = req.body;

  try {
    console.log("Data received:", dataToSave);

    const dataByCsId = {};

    for (const roomData of dataToSave) {
      if (!roomData || !roomData.room_id) {
        console.log("Skipping invalid roomData:", roomData);
        continue;
      }

      const { cs_id } = roomData;
      if (!dataByCsId[cs_id]) {
        dataByCsId[cs_id] = [];
      }
      dataByCsId[cs_id].push(roomData);
    }

    for (const csId in dataByCsId) {
      const roomDataList = dataByCsId[csId];
      const roomUsage = {};

      for (const roomData of roomDataList) {
        const {
          major_id,
          grade,
          build_name,
          room_id,
          seat,
          timeStart,
          timeEnd,
          amount,
          section,
          droppableIdRoom,
          timezone,
          Maxamount,
        } = roomData;

        if (amount === 0) {
          console.log(`Skipping room with room_id ${room_id} because amount is 0`);
          continue;
        }

        const schedule = await Schedule.findOne({
          "schedule.major_id": major_id,
          "schedule.major_grade": grade,
        });
        if (!schedule) {
          console.log(`Schedule with major_id ${major_id} and grade ${grade} not found`);
          return res.status(404).json({
            error: `Schedule with major_id ${major_id} and grade ${grade} not found`,
          });
        }

        const subject = schedule.subject.find(
          (sub) => sub.cs_id === csId && sub.grade === grade
        );
        if (!subject) {
          console.log(`Subject with cs_id ${csId} and grade ${grade} not found in schedule`);
          return res.status(404).json({
            error: `Subject with cs_id ${csId} and grade ${grade} not found in schedule`,
          });
        }

        const maxAmount = Maxamount[0];
        if (!roomUsage[room_id]) {
          roomUsage[room_id] = 0;
        }

        let usedCapacity = roomUsage[room_id];

        if (usedCapacity >= maxAmount) {
          console.log(`Room with room_id ${room_id} is full`);
          continue;
        }

        let roomAmount = amount;
        if (roomAmount + usedCapacity > maxAmount) {
          console.log(`Reducing room amount for room_id ${room_id} to remaining capacity`);
          roomAmount = maxAmount - usedCapacity;
        }

        if (roomAmount > subject.amount) {
          console.log(`Reducing room amount for room_id ${room_id} to remaining amount in subject`);
          roomAmount = subject.amount;
        }

        if (roomAmount <= 0) {
          console.log(`Skipping room with room_id ${room_id} because the remaining amount is 0 or less`);
          continue;
        }

        const roomDetail = {
          build_name,
          room_id,
          seat: seat.value[0],
          timeStart,
          timeEnd,
          amount: roomAmount,
          section,
          timezone,
          droppableIdRoom,
          maxAmount: maxAmount,
        };

        const existingRoomIndex = subject.room.findIndex(
          (room) => room.room_id === room_id
        );

        if (existingRoomIndex !== -1) {
          console.log(`Updating existing room with room_id ${room_id}`);
          subject.amount += subject.room[existingRoomIndex].amount;
          subject.room[existingRoomIndex] = roomDetail;
          subject.amount -= roomAmount;
        } else {
          console.log(`Adding new room with room_id ${room_id}`);
          subject.room.push(roomDetail);
          subject.amount -= roomAmount;
        }

        roomUsage[room_id] += roomAmount;

        await schedule.save();
        console.log("Schedule saved:", schedule);
      }
    }

    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
