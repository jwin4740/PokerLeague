var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", function(req, res) {
    // To do //
    //// sequelize query and logic here to populate leaderboard and tournaments list
    res.render("index", {
      playerData: playerData,
      tournament: tournament
    });
  });

  /////////// To do ///////////

  app.get("/admin", function(req, res) {
    res.render("admin",{});
  });

  app.get("/user", function(req, res) {
    res.render("user",{});
  });

  app.get("/register", function(req, res) {
    res.render("register",{});
  });

  app.get("/checkin", function(req, res) {
    res.render("checkin",{});
  });

  app.get("/tournament", function(req, res) {
    res.render("tournament",{});
  });

};