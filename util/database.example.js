const mysql = require("mysql2");

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "node-complete",
	password: "HERE GOES THE PASSWORD",
});

module.exports = pool.promise();
