exports.getLogin = (req, res, next) => {
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		isAuthenticated: req.isloggedIn,
	});
};

exports.postLogin = (req, res, next) => {
	req.isLoggedIn = true;
	res.redirect("/");
};
