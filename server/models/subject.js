const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema({
    major_id: String,
    cs_id: String,
    cs_name_th: String,
    cs_name_en: String,
    lc_sec: Array,
    lb_sec: Array,
    status_test: String,
    grade: Number,
    amount: Number
})

module.exports = mongoose.model("subject", SubjectSchema)

