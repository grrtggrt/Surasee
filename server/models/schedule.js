const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  build_name: String,
  room_id: String,
  seat: [String],
  timeStart: String,
  timeEnd: String,
  amount: Number,
  section: Number,
  droppableIdRoom: String,
});

const SubjectSchema = new mongoose.Schema({
  cs_id: String,
  cs_name_en: String,
  cs_name_th: String,
  grade: Number,
  major_id: String,
  amount: Number,
  date: String,
  droppableIdSchedule: String,
  room: [RoomSchema],
});

const ScheduleSchema = new mongoose.Schema({
  schedule: {
    major_id: String,
    major_grade: Number,
    semester: String,
    term: String,
  },
  subject: [SubjectSchema],
});

module.exports = mongoose.model('Schedule', ScheduleSchema);