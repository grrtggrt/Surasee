const mongoose = require('mongoose');

const MajorSchema = new mongoose.Schema({
  major_id: String,
  grade: Number,
  amount: Number
}, { _id: false });

const SubjectSchema = new mongoose.Schema({
  major_id: [MajorSchema],
  cs_id: String,
  cs_name_th: String,
  cs_name_en: String,
  lc_sec: [Number],
  lb_sec: [Number]
});

module.exports = mongoose.model("Subject", SubjectSchema);