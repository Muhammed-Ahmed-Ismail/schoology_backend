const app = require("./app");
//const connectDB = require("./db/connectDB);
const {sequelize} = require("./models")
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
	// await connectDB(...);
	app.listen(PORT, async function () {
 		console.log(`listening on port ${PORT}!`);
		 await sequelize.sync()
	});
     } catch (error) {
	console.log(error)
     }
};

startServer();
