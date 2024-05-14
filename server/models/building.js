const mongoose = require('mongoose')

const BuildingSchema = new mongoose.Schema({
    build_id: Number,
    build_name: String,
    room_id: String,
    seat: Array,
    amount: Number
})

module.exports = mongoose.model("building", BuildingSchema)