var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

 app.post("/add/tournament", function(req, res) {
    db.Tournament.create(req.body).then(function(result) {
    	// redirect to admin.html page to load new tournament data
    	res.redirect("/admin");
    });
});

app.post("/users/register", function(req, res) {
	db.User.create({
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	}).then(function(result) {
		// redirect to user.html with username in welcome message
		res.render("user", {
			userName: req.body.username
		})
	})
});

}