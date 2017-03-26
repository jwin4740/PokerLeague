// 1. We have data about users that have registered -> sequelize queries 
// to pull players with flag player_registered for tournament_id = $("tournament_id on /checkin in html-routes
// a. Get user_id from players where tournament_id = req.params.tournament_id.
// b. store that, and for each of the user_ids, get usernames

////////////////////// Newly added /////////////////////////
/////// Remove and replace this to new snippets of code for readability ///////////////

// On load of page, 
$(document).ready(function() {
	// Update content to allow users registered after checkin page load to be displayed
    var refresher = setInterval(update_content, 20000); // 20 seconds

    $(".checkIn").on("click", function(event) {
    	event.preventDefault();
    	var userId = $(this).attr("data-userId");
    	var tournament_id = $(this).attr("data-tournamentId");
    	
    	var checkinPlayerObject = {
    		UserId: userId,
    		TournamentId: tournament_id
    	}

    	$.ajax({
	      method: "PUT",
	      url: "/player/checkin",
	      data: checkinPlayerObject
	    })
	    .done(function() {
	    ///////// This does not work either /////////
	    	alert("hellooooo");
	    	// Hide checkIn button for checkedIn playerName
	      $(this).hide();
	    });
    });

 //    $("#startTournament").click(function checkMeIn() {
	//     playerName = $("#playerName").val().trim();
	// });
});

// Successful page reload every 20 secs
function update_content() {
	var tournamentId = $( "#playersForCheckin>tr button:first-child" ).attr("data-tournamentId");
   	console.log("Tournament id from url: " + tournamentId);

	$.get("/checkin/"+tournamentId, function(data) {
		// alert("reloaded!");
	});
}



