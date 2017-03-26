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
      res.render('user');
    // res.render('user', {
    //   userName: userName,
    //   tournament: tournamentsData
    // });
  });

  app.get("/register", function(req, res) {
    //Todo//
    res.render('register', {title: 'Form Validation', success: req.session.success, errors: req.session.errors});
    //this resets the errors and success properties to null after they have been shown to user
    req.session.errors = null;
    req.session.success = null
    
  });

 ////////////////////// Newly added /////////////////////////
/////// Remove and replace this to new snippets of code for readability ///////////////

  // Checkin page players display
  app.get("/checkin/:id", function(req, res) {
   var tournamentPlayers = [];
   var tournament_Id = req.params.id;
   // SELECT users.username FROM Users INNER JOIN Players ON users.id = players.UserId WHERE players.TournamentId = 1 AND players.player_registered_flag = 1;
   db.User.findAll({
    attributes: ['username', 'id'],
    include: [{
      model: db.Player,
      where: {
        TournamentId: tournament_Id,
        player_registered_flag: 1
      }
    }]
   }).then(function(playerNames) {
      // playerNames does not consist of just User.username and User.id hence array mapping
      tournamentPlayers = playerNames.map(function(item) {
        return {
          "username" : item.dataValues.username,
          "userId" : item.dataValues.id,
          "tournamentId": tournament_Id
        };
      });
      console.log(tournamentPlayers);
      // Render checkin page with names of registered users
      res.render('checkin', {
        player: tournamentPlayers,
        // express handlebars helper function inc to increment index by 1 for serial number display
        helpers: {
            inc: function (index) { return parseInt(index) + 1; }
        }
      });
   });
});


  app.get('/logout', function(req,res){
    console.log('get logout');
    req.session.destroy(function(error){
      console.log(error);
      res.redirect('/');
    })
  })

  ////////// To do ////////////

  app.get("/tournament", function(req, res) {
    res.render('tournament');
  });

};