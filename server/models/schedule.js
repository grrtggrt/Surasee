const mongoose = require('mongoose')

const ScheduleSchema = new mongoose.Schema({
    schedule: {
        major_id: String,
        major_grade: Number,
        semester: String,
        term: String
      },
    subject: [
        {
            cs_id: String,
            cs_name_en: String,
            cs_name_th: String,
            major_id: String,
            date: String,
            droppableIdSchedule: String,
            room:[
                {
                    room_id: String,
                    seat: String,
                    amount: Number,
                    section: Number,
                    timeStart: String,
                    timeEnd: String,
                    droppableIdRoom: String
                }
            ]
        }
    ]
})

module.exports = mongoose.model("schedule",ScheduleSchema)