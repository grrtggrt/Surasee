const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
// const bcrypt = require('bcrypt');
// const User = require('./models/auth');
require("dotenv").config()

// routes
const authRoute = require('./routes/auth')
const subject = require('./routes/subject')
const major = require('./routes/major')
const building = require('./routes/building')
const schedule = require('./routes/schedule')
const userRoutes = require('./routes/userRoutes');

const app = express()

mongoose.set('strictQuery', false);

// เพิ่มการตั้งค่าขนาดของ request body
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
app.use('/api', userRoutes);
// app.use('/api/upload', uploadRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Debug log
    res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      message: err.message,
    });
  });

// const updatePasswords = async () => {
//   try {
//       const users = await User.find({});
//       for (const user of users) {
//           if (!user.password.startsWith('$2b$')) { // ตรวจสอบว่ารหัสผ่านยังไม่ได้ถูกแฮช
//               user.password = await bcrypt.hash(user.password, 10);
//               await user.save();
//               console.log(`Password for user ${user.username} updated`);
//           }
//       }
//       console.log('All passwords updated');
//       process.exit();
//   } catch (error) {
//       console.error('Error updating passwords:', error);
//       process.exit(1);
//   }
// };

// updatePasswords();

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`start sever in port ${port}`)) // ใช้ template literals ในการระบุพอร์ต
