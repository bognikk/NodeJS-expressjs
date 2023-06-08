const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI = `mongodb+srv://nikola:${DATABASE_PASSWORD}@cluster0.kf6ie2q.mongodb.net/shop`;

const app = express();
const store = new MongoDBStore({
	uri: MONGODB_URI,
	collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
	session({
		secret: "my secret",
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);

app.use((req, res, next) => {
	User.findById("64808b5a639ce614c36ae1ed")
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => {
			console.log(err);
		});
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
// 	// app.listen(8080);
// 	app.listen(8080, () => console.log("App listening on port 8080"));
// });

mongoose
	.connect(MONGODB_URI)
	.then((result) => {
		User.findOne().then((user) => {
			if (!user) {
				const user = new User({
					name: "Nikola",
					email: "nikola@test.com",
					cart: {
						items: [],
					},
				});
				user.save();
			}
		});
		app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
	})
	.catch((err) => {
		console.log(err);
	});
