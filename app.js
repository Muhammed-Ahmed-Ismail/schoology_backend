let express = require('express');
let app = express();
let cors = require('cors');

const passport = require('passport');
require('./config/passport')(passport);

const routes = require("./routes/routes");
const errorHandler = require("./middleware/errorHandlers/errorHandler");

app.use(passport.initialize({}));
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use("/",routes);
app.use(errorHandler);

module.exports = app;
