const app = require("./app");
const {sequelize} = require("./models")
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
	app.listen(PORT, async function () {
 		console.log(`listening on port ${PORT}!`);
		//  await sequelize.sync({alter:true})
	});
     } catch (error) {
	console.log(error)
     }
};

startServer().catch(e => console.error(e));
