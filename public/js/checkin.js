$(document).ready(function(e) {
    var refresher = setInterval(update_content, 30000); // 30 seconds
})

$("#startTournament").click(function checkMeIn() {
    playerName = $("#playerName").val().trim();
});


// 1. We have data about users that have registered -> sequelize queries 
// to pull players with flag player_registered for tournament_id = $("tournament_id on /checkin in html-routes
// a. Get user_id from players where tournament_id = req.params.tournament_id.
// b. store that, and for each of the user_ids, get usernames

// SELECT username from USERS inner join PLAYERS ON player_id = user_id WHERE tournament_id = req.params.id AND 

// Checkin button.on click -> Update Player Set player_checkedin_flag = 1 where ;


// SELECT Userid from Players where tournament_id = req.params.id