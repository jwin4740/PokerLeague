var path = require("path");
var db = require("../models");
var sessions = require("express-session");

var session;

// Routes
// =============================================================
module.exports = function(app) {

//ADD A TOURNAMENT
 app.post("/add/tournament", function(req, res) {
    db.Tournament.create(req.body).then(function(result) {
    	// redirect to admin.html page to load new tournament data
    	res.redirect("/admin");
    });
});

//REGISTER NEW USER
app.post("/users/register", function(req, res, next) {
	//Validation - we can pick other things like minimum length of password, etc.
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		req.session.errors = errors;
		req.session.success = false;
		res.render('register', {
			errors: errors
		});
	}else{
		req.session.success = true;

		db.User.create({
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	}).then(function(result) {
		// redirect to user.html with username in welcome message
		res.render('user', function(req,res){
			userName: req.body.username
			});
		});
	};	
});

//SESSION LOGIN
app.post("/login", function(req, res){
	var session = req.session;
	var email = req.body.email;
	var password = req.body.password;
	session.uniqueID = req.body.email;

	console.log("post login");

	db.User.findOne({
		where: {
			email: email, 
			password: password
		}
	}).then(function(user){

		if(user){
			res.redirect('/user');

		}else{
			console.log("not a user");
			res.redirect('/');
		}

	});
	
});
	

};