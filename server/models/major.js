const mongoose = require('mongoose')

const MajorSchema = new mongoose.Schema({
    major_id: String,
    fac_id: String,
    major_name_th: String,
    major_name_en: String,
    fac_name: String,
    major_status: String,
    major_grade: Number
})

module.exports = mongoose.model("major", MajorSchema)