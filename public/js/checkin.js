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
    	var checkinArea = $(this).parent();
    	console.log(checkinArea);
    	var checkinButton = $(this);
    	checkinButton.attr('disabled', true);

    	$.ajax({
	      method: "PUT",
	      url: "/player/checkin",
	      data: checkinPlayerObject
	    })
	    .done(function(data) {
	    	console.log(data);
	    	// Hide checkIn button for checkedIn playerName
	      	checkinButton.hide();
	      	// Add css for error messages in green rather than red similar to form validation.
	      	checkinArea.append("<p>Player Checked In successfully.</p>");
	      	removeMessage();
	    }).fail(function(data) {
	    	console.log("checkin Failed");
	    	checkinButton.attr('disabled', false);
	    	// Add css for error messages similar to form validation during register for uniformity.
	    	checkinArea.append("<p>Unable to Check In player. Try again.</p>");
	    	removeMessage();
	    });
	    function removeMessage() {
	    	setTimeout(function(){ checkinArea.children("p").remove(); }, 3000);
	    }
    });

 //    $("#startTournament").click(function checkMeIn() {
	//     playerName = $("#playerName").val().trim();
	// });
});

// Until a better method is found ----> page reload every 20 secs
function update_content() {
	var tournamentId = $( "#playersForCheckin>tr button:first-child" ).attr("data-tournamentId");
   	console.log("Tournament id from url: " + tournamentId);

	$.get("/checkin/"+tournamentId, function(data) {
		// alert("reloaded!");
	});
}



