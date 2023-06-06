const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	User.findById("647aa273cbd06393dc1f3e96")
		.then((user) => {
			req.user = new User(user.name, user.email, user.cart, user._id);
			next();
		})
		.catch((err) => {
			console.log(err);
		});
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
// 	// app.listen(8080);
// 	app.listen(8080, () => console.log("App listening on port 8080"));
// });

mongoose
	.connect(
		"mongodb+srv://nikola:PASSWORD@cluster0.kf6ie2q.mongodb.net/shop?retryWrites=true&w=majority"
	)
	.then((result) => {
		app.listen(8080, () => console.log("App listening on port 8080"));
	})
	.catch((err) => {
		console.log(err);
	});
