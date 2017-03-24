var path = require("path");
var db = require("../models");

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

  db.Tournament.findAll({}).then(function(tournamentResults){
    res.render("admin", {
      tournament: tournamentResults
    });
 
  });
});

  app.get("/user", function(req, res) {
    //Todo code//
    // Code here to add a flag ofUser to tournamentsData so handlebars 
    // can check if it belongs to user's list of tournaments or not, and display accordingly.
    res.render('user', {
      userName: userName,
      tournament: tournamentsData
    });
  });

  app.get("/register", function(req, res) {
    //Todo//
    res.render('register', {title: 'Form Validation', success: req.session.success, errors: req.session.errors});
    //this resets the errors and success properties to null after they have been shown to user
    req.session.errors = null;
    req.session.success = null
    
  });

  app.get("/checkin", function(req, res) {
    //Todo//
    // Get all players registered for current tournament
    res.render('checkin', {
      userName: userName,
      player: tournamentPlayers
    });
  });

  ////////// To do ////////////

  app.get("/tournament", function(req, res) {
    res.render('tournament');
  });

};