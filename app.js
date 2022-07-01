let express = require('express');
let app = express();
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const userRouter = require('./routes/authRoutes');
app.use('/api/auth',userRouter);

module.exports = app;
