let express = require('express');
let cors = require('cors')
let app = express();


const passport = require('passport')
require('./config/passport')(passport)



//***********Routes Import*************************//
// const meetingRouter = require("./routes/meeting")
// const testdbRoutes = require("./routes/testdb")
const routes = require("./routes/routes")
const errorHandeler = require("./middleware/errorHandelers/errorHandeler")
// app.use(formData.parse())
app.use(passport.initialize());
app.use(cors({
    origin: '*'
}))

app.use(express.json());
app.use("/",routes)
app.use(errorHandeler)
// app.use("/dptest",testdbRoutes)


module.exports = app;
