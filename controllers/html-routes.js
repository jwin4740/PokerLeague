var path = require("path");
var db = require("../models");
var moment = require("moment");

var session;

var handlebarHelpers = 
          {
            inc: function (index) { 
              return parseInt(index) + 1; 
            },

            dateFormat: function(date) {
              return moment(date).format("ll");
            },
            
            timeFormat: function(time) {
              return moment(time, "HH:mm:ss").format("LT");
            },

            dateTimeFormat: function(dateTime) {
              return moment(dateTime).format("ll, LT");
            }
          }

// Routes
// =============================================================
module.exports = function(app) {

//////// CREATE NEW object models TO PROVIDE SPECIFIC DATA FROM DB , AVOIDING ASYNC ISSUES ////////

app.get("/", function(req, res) {

   ////////////////////// Newly added /////////////////////////
/////// Remove and replace this to new snippets of code for readability ///////////////

   db.User.findAll({
    include: [{
      model: db.Player
    }]
   }).then(function(userResults) {
    // console.log(userResults);
      // var userData = userResults[0];
      var pointsData = userResults.map(function(userItem) {
        var points = 0;
        var playerData = userItem.dataValues.Players;
        playerData.forEach(function(playerItem) {
          if(userItem.id === playerItem.UserId) {
              points = playerItem.dataValues.points + points;
           }
         });
        return {
          "id": userItem.id,
          "username": userItem.username,
          "lastPlayed": userItem.updatedAt,
          "points": points
        }
      });
      console.log(pointsData);
    db.Tournament.findAll({}).then(function(tournamentResults){
      // console.log(tournamentResults);
        res.render("index", {
          playerData: pointsData,
          tournament: tournamentResults,
          helpers: handlebarHelpers
        });
    });
  });
});

// Render tournament data on admin page
app.get("/admin", function(req, res) {
  session = req.session;
  if (session.uniqueID[1] === 'admin'){
  db.Tournament.findAll({}).then(function(tournamentResults){
    res.render("admin", {
      tournament: tournamentResults,
      helpers: handlebarHelpers
    });
 
  });
  }else{
    console.log('unauthorized access');
    res.redirect('/');
  }
});

// Render tournament specific to user and other tournaments
  app.get("/user", function(req, res) {
    //Todo code//
    // Query database for all tournaments - then

    // for only those user has registered for
    //SELECT tournaments.name, tournaments.date, tournaments.time, players.player_registered_flag 
    //FROM tournaments INNER JOIN Players ON tournaments.id = Players.TournamensId
    // WHERE Players.UserId = req.session.id;

    ////////// And query tournaments unregistered by user ------ TODO ///////////

    // Currently showing all tournaments
    db.Tournament.findAll({}).then(function(tournamentResults){

      res.render("user", {
        tournament: tournamentResults,
        helpers: handlebarHelpers
      });
    });
    // Code here to add a flag ofUser to tournamentsData so handlebars 
    // can check if it belongs to user's list of tournaments or not, and display accordingly.
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

  // Checkin page players display
  app.get("/checkin/:id", function(req, res) {
   var tournamentPlayers = [];
   var tournament_Id = req.params.id;
   // SELECT users.username FROM Users INNER JOIN Players ON users.id = players.UserId WHERE players.TournamentId = 1 AND players.player_registered_flag = 1;
   db.User.findAll({
    include: [{
      model: db.Player,
      where: {
        TournamentId: tournament_Id,
        player_registered_flag: 1,
      }
    }]
   }).then(function(playerNames) {
      // playerNames does not consist of just User.username and User.id hence array mapping
      tournamentPlayers = playerNames.map(function(item) {
        return {
          "username" : item.dataValues.username,
          "userId" : item.dataValues.id,
          "tournamentId": tournament_Id,
          "player_checkedIn_flag": item.dataValues.Players[0].dataValues.player_checkedIn_flag
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
   }).catch(function (err) {
      // handle error;
      console.log("Error: " + err);
      ///////////////// To do //////////////////
      // res.redirect("/500");
      res.render("500", {error: err});
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

  // app.use(function(req, res) {
  //   res.type('text/html');
  //   res.status(404);
  //   res.render('404');
  // });

  app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.render('500');
  });

};


