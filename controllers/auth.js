exports.getLogin = (req, res, next) => {
	const isloggedIn = req.get("Cookie").split("=")[1];
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		isAuthenticated: isloggedIn,
	});
};

exports.postLogin = (req, res, next) => {
	req.session.isloggedIn = true;
	res.redirect("/");
};
