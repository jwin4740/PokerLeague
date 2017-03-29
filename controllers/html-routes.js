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
          };

// Routes
// =============================================================
module.exports = function(app) {

//////// CREATE NEW object models TO PROVIDE SPECIFIC DATA FROM DB , AVOIDING ASYNC ISSUES ????? ///////

app.get("/", function(req, res) {
  // Query to populate leaderboard
   db.User.findAll({
    include: [{
      model: db.Player
    }],
     order: [ [ 'updatedAt', 'DESC' ]]
   }).then(function(userResults) {
    // console.log(userResults);
      var updatedAtParent;
      var pointsData = userResults.map(function(userItem) {
        var points = 0;
        var playerData = userItem.dataValues.Players;
        playerData.forEach(function(playerItem) {
          var updatedAt = playerItem.dataValues.createdAt;
          if(userItem.id === playerItem.UserId) {
              points = playerItem.dataValues.points + points;
              // console.log("First datetime: " + moment(playerItem.dataValues.updatedAt).fromNow() + " playerItemUpdatedAt " + playerItem.dataValues.updatedAt);
              // console.log("greater than second datetime: " + moment(updatedAt).fromNow() + " updatedAt " + updatedAt);
              if(moment(playerItem.dataValues.updatedAt).fromNow() > moment(updatedAt).fromNow()){
                updatedAt = playerItem.dataValues.updatedAt;
              }
           }
           updatedAtParent = updatedAt;
           // console.log("---");
           // console.log(moment(updatedAtParent).format());
           // console.log("---");
         });
        return {
          "id": userItem.id,
          "username": userItem.username,
          "lastPlayed": updatedAtParent,
          "points": points
        };
      });
      // console.log(pointsData);
    db.Tournament.findAll({}).then(function(tournamentResults){
      // console.log(tournamentResults);
        res.render("index", {
          playerData: pointsData,
          tournament: tournamentResults,
          helpers: handlebarHelpers,
          newUser: req.session.newRegister
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
  app.get("/user/:id", function(req, res) {
    console.log("------");
    console.log(req.session.uniqueID);
    console.log("------");

    if(req.session.uniqueID === undefined) {
      res.render("401");
    }else {

      var userId = req.params.id;
      // Get tournaments and players table data
      db.Tournament.findAll({
        include: [{
        model: db.Player
      }]
     }).then(function(tournamentResults){
      // With tournamentsResults, map it to required json data format 
      var userTournamentData = tournamentResults.map(function(tournamentItem) {
          var ofUser = false;
          var playerData = tournamentItem.dataValues.Players;
          playerData.forEach(function(playerItem) {
            // For current user
              if(playerItem.dataValues.UserId == userId) {
                // Check if this tournament was registered for
                if(playerItem.dataValues.player_registered_flag == 1) {
                  // If yes, set flag to true
                  ofUser = true;
                  // else flag will be false
                }
                
              }
          });
          // Return required data
          return {
            "userId": userId,
             "id" : tournamentItem.id,
             "name" : tournamentItem.name,
              "date" : tournamentItem.date,
              "time" : tournamentItem.time,
              "ofUser" : ofUser
          };

        });
        // console.log(userTournamentData);
       
        res.render('user', {
          // userName: userName,
          tournament: userTournamentData,
          helpers: handlebarHelpers
        });
    });
  }
 
});

  app.get("/register", function(req, res) {
    //Todo//
    res.render('register', {title: 'Form Validation', success: req.session.success, errors: req.session.errors});
    //this resets the errors and success properties to null after they have been shown to user
    req.session.errors = null;
    req.session.success = null;
    
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
          "player_checkedIn_flag": item.dataValues.Players[0].dataValues.player_checkedIn_flag
        };
      });
      // console.log(tournamentPlayers);
      // Render checkin page with names of registered users
      res.render('checkin', {
        player: tournamentPlayers,
        tournamentId: tournament_Id,
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
    });
  });

  app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(401);
    res.render('401');
  });

  app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.render('500');
  });

};


