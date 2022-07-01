let express = require('express');
let cors = require('cors')
let app = express();

//***********Routes Import*************************//
const meetingRouter = require("./routes/meeting")
const testdbRoutes = require("./routes/testdb")


app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.use("/meeting",meetingRouter)
app.use("/dptest",testdbRoutes)


const userRouter = require('./routes/authRoutes');
app.use('/api/auth',userRouter);

module.exports = app;
