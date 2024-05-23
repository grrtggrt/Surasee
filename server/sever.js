const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const authRoute = require('./routes/auth')
const subject = require('./routes/subject')
const major = require('./routes/major')
const building = require('./routes/building')
const schedule = require('./routes/schedule')


const app = express()

//connet cloud database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("เชื่อมต่อ DATABASE เรียบร้อย"))
.catch((err)=>console.log(err))

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//route
app.use('/api', authRoute)
app.use('/api', subject)
app.use('/api', major)
app.use('/api', building)
app.use('/api', schedule)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`start sever in port ${port}`)) // ใช้ template literals ในการระบุพอร์ต
