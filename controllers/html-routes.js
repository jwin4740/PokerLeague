var path = require("path");
var db = require("../models");

var session;

// Routes
// =============================================================
module.exports = function(app) {

app.get("/", function(req, res) {
  db.User.findAll({}).then(function(userResults) {
    
    db.Tournament.findAll({}).then(function(tournamentResults){
        res.render("index", {
          playerData: userResults,
          tournament: tournamentResults

        });
    });
  });
});

app.get("/admin", function(req, res) {
  session = req.session;
  if (session.uniqueID[1] === 'admin'){
  db.Tournament.findAll({}).then(function(tournamentResults){
    res.render("admin", {
      tournament: tournamentResults
    });
 
  });
  }else{
    console.log('unauthorized access');
    res.redirect('/');
  }
});

  app.get("/user", function(req, res) {
    //Todo code//
    // Code here to add a flag ofUser to tournamentsData so handlebars 
    // can check if it belongs to user's list of tournaments or not, and display accordingly.
     session = req.session;
   if (session.uniqueID[1] === 'user'){
      res.render("user");
    }
  });

  app.get("/register", function(req, res) {
    //Todo//
    res.render('register', {title: 'Form Validation', success: req.session.success, errors: req.session.errors});
    //this resets the errors and success properties to null after they have been shown to user
    req.session.errors = null;
    req.session.success = null;
    
  });

  app.get("/checkin", function(req, res) {
    //Todo//
    // Get all players registered for current tournament
    res.render('checkin', {
      userName: userName,
      player: tournamentPlayers
    });
  });

  app.get('/logout', function(req,res){
    console.log('get logout');
    req.session.destroy(function(error){
      console.log(error);
      res.redirect('/');
    });
  });

  ////////// To do ////////////

  app.get("/tournament", function(req, res) {
    res.render('tournament');
  });

};