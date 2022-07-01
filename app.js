let express = require('express');
let cors = require('cors')
let app = express();

//***********Routes Import*************************//
const meetingRouter = require("./routes/meeting")
const testdbRoutes = require("./routes/testdb")
const userRouter = require('./routes/authRoutes');


app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.use("/meeting",meetingRouter)
app.use("/dptest",testdbRoutes)


app.use('/auth',userRouter);

module.exports = app;
