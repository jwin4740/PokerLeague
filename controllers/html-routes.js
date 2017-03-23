var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", function(req, res) {
    // To do //
    //// sequelize query and logic here to populate leaderboard and tournaments list
    res.render("index", {
      playerData: playerData,
      tournament: tournaments
    });
  });

  app.get("/admin", function(req, res) {
    //Todo sequelize//
    // Get all tournaments and their details.
    res.render('admin', {
      userName: userName,
      tournament: tournamentsData
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
    res.render('register', {
      errors: errors,
      msg: message
      //// ^ Check this -> register.handlebars seems to have {{errors}} and {{msg}}
    });
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