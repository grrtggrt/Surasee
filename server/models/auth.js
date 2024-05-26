const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  surname: String,
  profileImage: Buffer, // เก็บภาพในรูปแบบ Buffer
});

module.exports = mongoose.model('aunth', authSchema);
