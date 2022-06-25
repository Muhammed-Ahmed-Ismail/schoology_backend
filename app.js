let express = require('express');
let app = express();

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

module.exports = app;
