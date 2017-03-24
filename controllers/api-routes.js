var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

 app.post("/add/tournament", function(req, res) {
    // To do //
    //// sequelize query and logic here to populate leaderboard and tournaments list
    db.Tournament.create(req.body).then(function(result) {
    	res.redirect("/admin");
    });
});

}

