let express = require('express');
let cors = require('cors')
let app = express();

const meetingRouter = require("./routes/meeting.js")
app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.get("/",(req,res)=>{
    res.send({message:"done"})
})
app.use("/meeting",meetingRouter)


module.exports = app;
