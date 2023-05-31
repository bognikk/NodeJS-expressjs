const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	"node-complete",
	"root",
	"HERE GOES THE PASSWORD",
	{
		dialect: "mysql",
		host: "localhost",
	}
);

module.exports = sequelize;
