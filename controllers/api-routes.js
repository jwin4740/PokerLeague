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
    };
};

const genRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
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
        //Validation - checks if form is filled out properly
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        var errors = req.validationErrors();

        if (errors) { //if errors restart register page
            req.session.errors = errors;
            req.session.success = false;
            res.render('register', {
                errors: errors
            });
        } else { //else look if there is a current user with same username or same email address

        	db.User.findAll({
    	   	where: {
    	   		$or: [
    		   		{
    		   			username: req.body.username
    		   		},
    		   		{
    		   			email: req.body.email
    	   			}
    	   		]
    	   	}
    	   	}).then(function(userResults) {
    	   		if(userResults.length){ //if there is a match of same name, restart register page
    	   			res.render('register', {
                    errors: [{msg: "Username or e-mail already in use"}]
                });
    	   		}else { //else hash password and create the user

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
                         req.session.newRegister = true;
                        res.redirect('/');
                    });   		
                }

    	   	});
        }
    });

    //SESSION LOGIN
    app.post("/login", function(req, res) {
        var session = req.session;
        var email = req.body.email;
        var password = req.body.password;
        console.log("am here");
         session.newRegister = false;
        //checks hash against hash for entry validation
        db.User.findOne({
            where: {
                email: email
            }
        }).then(function(data) {
            var salt = data.salt;
            var hashedPassword = sha512(req.body.password, salt).passwordHash;
            if (hashedPassword === data.hash) {
            	session.loggedIn = true;
                session.uniqueID = [data.email, data.role, data.id, data.username];
                if (data.role === "admin") {
                    res.send({redirect: '/admin'});
                } else if (data.role === "user") {
                    res.send({redirect: '/user/' + data.id});
                } else {
                    console.log('No role found');
                }
            } else {
                console.log("Illegal entry detected.");
                res.redirect('/');
            }

        
        }).catch(function(err) {
            res.end(err);
        });
    });


//REGISTER FOR TOURNAMENT
    app.put('/register/tournament', function(req, res) {
        var tournamentID = req.body.tournamentId;
        var userID = req.session.uniqueID[2];
        console.log("Inside api-routing /register/tournament function");
        if(userID == req.body.userId) {
            console.log("User Id = reqbodyuserId; Data querying now.");
            db.Player.findAll({
                attributes: ['player_registered_flag','updatedAt','createdAt'],
                where: {
                    UserId: userID,
                    TournamentId: tournamentID
                },
                limit: 1,
                order: [ [ 'updatedAt', 'DESC' ]]
            }).then(function(registeredData) {
                console.log(registeredData);
                if(registeredData.length === 0) {
                    db.Player.create({
                        UserId: userID,
                        TournamentId: tournamentID,
                        player_registered_flag: 1
                    }).then(function(data) {
                        console.log(data);
                    });
                }else {
                    var updatedAt = registeredData[0].dataValues.updatedAt;
                    db.Player.update({
                        player_registered_flag: 1
                    },{
                        where:{
                        UserId: userID,
                        TournamentId: tournamentID,
                        updatedAt: updatedAt
                        }
                    }).then(function(data) {
                        console.log(data);
                    });
                }
                // res.redirect("/user/"+userID);
                res.json("Player registration updated.");
            });
        }

    });

//UNREGISTER FOR TOURNAMENT
    app.put('/unregister/tournament', function(req, res) {
        console.log("unregister");
        var tournamentID = req.body.tournamentId;
        var userID = req.session.uniqueID[2];
        if(userID == req.body.userId) {
            db.Player.update({
                player_registered_flag: 0
            },{
                where:{
                UserId: userID,
                TournamentId: tournamentID
                }
            }).then(function(data) {
                res.json("Unregistered for tournament.");
            });
        }
    });
    
// PUT route to update checkedIn players in table
    app.put("/player/checkin", function(req, res) {
        db.Player.update(
          {
          	player_checkedIn_flag: 1
          },
          {
            where: {
              UserId: req.body.UserId,
              TournamentId: req.body.TournamentId
            }
          }).then(function(data) {
            res.json("flag updated on checkin");
          });
    });

// PUT route to update player points 
    app.post("/player/results", function(req, res) {
        // console.log(req.body.resultsDataArray);
        var resultsArray = req.body.resultsDataArray;
        var updatesPromiseArray = [];
        // Looping through data array, and pushing the promise of each sequelize update query into an array
        resultsArray.forEach(function(item) {
            // console.log(item);
            updatesPromiseArray.push(
                            db.Player.update(
                            {
                              points: item.points
                            },
                            {
                              where: {
                                UserId: item.UserId,
                                TournamentId: item.TournamentId
                              }
                            })
            ); //end of promise array
        });

        // Waiting for all db updates to complete before deciding success/failure and returning control to client browser
        Promise.all(updatesPromiseArray).then(function(data) {
            // On success
            console.log("success" + data);
            res.json({
                redirectURL: "/admin",
                status: "success"
            });
            // On failure
        }, function(err) {
            console.log("Something failed.");
            res.send(500, err);
        });
    });

// Get request to get session data
    app.get("/loggedIn", function(req, res) {
    	res.json(req.session);
    });
};

