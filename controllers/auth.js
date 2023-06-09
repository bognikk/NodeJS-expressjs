const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		isAuthenticated: false,
	});
};

exports.postLogin = (req, res, next) => {
	User.findById("64808b5a639ce614c36ae1ed")
		.then((user) => {
			req.session.isLoggedIn = true;
			req.session.user = user;
			req.session.save((err) => {
				console.log(err);
				res.redirect("/");
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getSignup = (req, res, next) => {
	res.render("auth/signup", {
		path: "/signup",
		pageTitle: "Signup",
		isAuthenticated: false,
	});
};

exports.postSignup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;
	User.findOne({ email: email })
		.then((user) => {
			if (user) return res.redirect("/signup");
			return bcrypt.hash(password, 12);
		})
		.then((hashedPassword) => {
			if (hashedPassword) {
				const user = new User({
					email: email,
					password: hashedPassword,
					cart: { items: [] },
				});
				return user.save();
			}
		})
		.then((savedUser) => {
			if (savedUser) res.redirect("/login");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect("/");
	});
};
