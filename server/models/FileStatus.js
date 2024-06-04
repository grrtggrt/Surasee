const mongoose = require('mongoose');

const FileStatusSchema = new mongoose.Schema({
    name: { type: String, required: true },
    table: { type: String, required: true },
    time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FileStatus', FileStatusSchema);
