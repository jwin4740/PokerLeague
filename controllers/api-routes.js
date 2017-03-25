var path = require("path");
var db = require("../models");
var sessions = require("express-session");
var crypto = require('crypto');

var session;

//hash functions
const sha512 = (password, salt) => {
		    let hash = crypto.createHmac('sha512', salt);
		    hash.update(password);
		    let value = hash.digest('hex');
		    return {
		        salt: salt,
		        passwordHash: value
		    }
		};

		const genRandomString = (length) => {
		    return crypto.randomBytes(Math.ceil(length/2))
		        .toString('hex')
		        .slice(0,length);
		};

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

		var salt = genRandomString(32);
		var hashedPassword = sha512(req.body.password, salt).passwordHash;

				db.User.create({
				email: req.body.email,
				username: req.body.username,
				hash: hashedPassword,
				salt: salt
			}).then(function(result) {
				// redirect to user.html with username in welcome message
				res.render('user', {
					userName: req.body.username
					});
			});
	}	
});

//SESSION LOGIN
app.post("/login", function(req, res){
	var session = req.session;
	var email = req.body.email;
	var password = req.body.password;
	
	//checks hash against hash for entry validation
	db.User.findOne({
		where: {
			email: email
		}
	}).then(function(data){
	  var salt = data.salt;
	  var hashedPassword = sha512(req.body.password, salt).passwordHash;
	  if(hashedPassword === data.hash){
	  	session.uniqueID = [data.email, data.role];
		  	if(data.role === "admin"){
		  		res.redirect('/admin');
		  	}else if(data.role === "user"){
		  		res.redirect('/user');
		  	}else{
		  		console.log('No role found');
		  	}	  	
	  }else{
	  	console.log("Illegal entry detected, fuck off");
	  	console.log("Illegal entry detected, fuck off");
	  	console.log("Illegal entry detected, fuck off");
	  	console.log("Illegal entry detected, fuck off");
	  	console.log("Illegal entry detected, fuck off");
	  	console.log("Illegal entry detected, fuck off");
	  	console.log("Illegal entry detected, fuck off");
	  	res.redirect('/');
	  }

	});
	
});
	

};