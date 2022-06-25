const app = require("./app");
//const connectDB = require("./db/connectDB);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
	// await connectDB(...);
	app.listen(PORT, function () {
 		console.log(`listening on port ${PORT}!`);
	});
     } catch (error) {
	console.log(error)
     }
};

startServer();
