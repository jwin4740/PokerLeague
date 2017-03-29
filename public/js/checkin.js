// 1. We have data about users that have registered -> sequelize queries 
// to pull players with flag player_registered for tournament_id = $("tournament_id on /checkin in html-routes
// a. Get user_id from players where tournament_id = req.params.tournament_id.
// b. store that, and for each of the user_ids, get usernames

// On load of page, 
$(document).ready(function() {
	$("#submitResults").hide();
	$("#tournamentArea").hide();
	// Update content to allow users registered after checkin page load to be displayed
    var refresher = setInterval(update_content, 20000); // 20 seconds

    $(".checkIn").on("click", function(event) {
    	event.preventDefault();
    	var userId = $(this).attr("data-userId");
    	var tournament_id = $(this).attr("data-tournamentId");
    	
    	var checkinPlayerObject = {
    		UserId: userId,
    		TournamentId: tournament_id
    	};
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
	      	// Check mark for checked in players
	      	checkinArea.html("<i data-userId='"+ userId + "' style='color: #19b739;' class='fa fa-3x fa-check' aria-hidden='true'></i>");
	      	removeMessage();
	      	/////////////// Add data-checkedIn to checkedIn player td ////////////////
	    }).fail(function(data) {
	    	console.log(data);
	    	checkinButton.attr('disabled', false);
	    	// Add css for error messages similar to form validation during register for uniformity.
	    	checkinArea.append("<p>Unable to Check In player. Try again.</p>");
	    	removeMessage();
	    });

	    // Function to remove success/ fail message after 3 secs
	    function removeMessage() {
	    	setTimeout(function(){ checkinArea.children("p").remove(); }, 3000);
	    }
    });

    var usernameArray = [];
    var playerCount = 0;

    // On starting Tournament, take players that have been checked in (sequel query or using )
    $("#startTournament").on("click", function(event) {
		event.preventDefault();
		$("#tournamentArea").show();
		// Stopping page refresh
		clearInterval(refresher);
		$(this).hide();
		$("#checkinDiv").hide();
		// console.log($("tbody").children());
		usernameArray = $("[data-checkedIn='true']").prev();
		// console.log(usernameArray);
		// Setting number of players to update rank
		playerCount = usernameArray.length;

		usernameArray.each(function(index, value) {
			
			var userIdData = $(value).attr("data-userId");
			var usernameData = $(value).html();
			
			// var userIdData = 
			$("#tournamentBody").append("<tr><td class='usernameColumn' data-userId='" + userIdData + "'>" + usernameData + "</td><td class='rankColumn'><button type='button' class='btn btn-lg btn-danger eliminate'>Eliminate</button></td></tr>").append();

		});
		$("#submitResults").attr('disabled', true).show();
	});

	// On click of eliminate, length of array usernameArray 
	$("#tournamentBody").on("click", ".eliminate", function(event) {
		event.preventDefault();
		if(playerCount === 1) {
			$("#submitResults").attr('disabled', false);
		}
		$(this).parent().append("<h1>"+playerCount+"</h1>");
		// console.log($(this).parent().parent());
		$("#tournamentBody").prepend($(this).parent().parent());
		$(this).remove();
		playerCount = playerCount - 1;
	});

	// submitButton . on click loop through each tr in table, use index to calculate rank, and run function to calculate points.
	$("#submitResults").on("click", function(event) {
		event.preventDefault();
		$("#tournamentBody>tr").each(function(index, value) {
			var resultData = {};
			console.log(value);
			resultData = {
				UserId: $(value).find(".usernameColumn").attr("data-userid"),
				Rank: $(value).find(".rankColumn").children().html()
			};
			console.log(resultData);
			//// Get points and put in object using function
		});
	});

function calculatePoints() {
	
}

});

// Until a better method is found ----> page reload every 20 secs
function update_content() {
	var tournamentId = $( "#playersForCheckin>tr button:first-child" ).attr("data-tournamentId");
   	console.log("Tournament id from url: " + tournamentId);

	$.get("/checkin/"+tournamentId, function(data) {
		// alert("reloaded!");
	});
}


$("#logoutButton").on("click", function(){
	sessionStorage.clear();
});





