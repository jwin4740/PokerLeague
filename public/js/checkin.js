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
    	// console.log(checkinArea);
    	var checkinButton = $(this);
    	checkinButton.attr('disabled', true);
    	checkinArea.attr("data-checkedin","true");

    	$.ajax({
	      method: "PUT",
	      url: "/player/checkin",
	      data: checkinPlayerObject
	    })
	    .done(function(data) {
	    	// console.log(data);
	    	// Hide checkIn button for checkedIn playerName
	      	checkinButton.hide();
	      	// Check mark for checked in players
	      	checkinArea.html("<i data-userId='"+ userId + "' style='color: #31E28F;' class='fa fa-3x fa-check' aria-hidden='true' ></i>");
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
		
		usernameArray = $("[data-checkedIn='true']").prev(); //creates a list of all elements NEXT TO the elements that meet this requirement
		// console.log(usernameArray);
		// Setting number of players to update rank
		playerCount = usernameArray.length;

		usernameArray.each(function(index, value) {
			
			var userIdData = $(value).attr("data-userId");
			var usernameData = $(value).html();
			
			// var userIdData = 
			$("#tournamentBody").append("<tr><td class='usernameColumn' data-userId='" + userIdData + "'>" + usernameData + "</td><td class='rankColumn'><button type='button' class='btn btn-lg btn-danger red eliminate'>Eliminate</button></td></tr>").append();

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

		var resultsDataArray = [];
 		var resultsData = {};
 		var tournamentId = $(this).attr("data-tournamentId");
 		console.log(tournamentId);
 		// Loop through each row in table to get data
  		$("#tournamentBody>tr").each(function(index, value) {
		// console.log(value);
 			var rank = parseInt($(value).find(".rankColumn").children().html());
 			var userId = $(value).find(".usernameColumn").attr("data-userid");
 			// Call function to calculate points
 			var points = calculatePoints(rank, usernameArray);
 			// Get points and put in object using function
 			resultsDataArray.push({
 				UserId: userId,
 				TournamentId: tournamentId,
 				points: points
 			});
 			resultsData = {resultsDataArray};
 			console.log(resultsData);	
		});
		console.log("Firing ajax");
		// AJAX POST to post tournament results to database
		$.ajax({
	      method: "POST",
	      url: "/player/results",
	      data: resultsData
	    })
	    .success(function(data) {
	    	console.log(data);
	    	if(data.status === "success") {
	    		window.location = data.redirectURL;
	    	}
	    }).fail(function(err) {
	    	console.log("Error: " + err);
	    });

	});

	$("#logoutButton").on("click", function(){
		sessionStorage.clear();
	});


});


function calculatePoints(position, playersArray) {
	var numberOfPlayers = playersArray.length;
	var points = (numberOfPlayers - position + 1) * 5;
	// console.log("Points after formula: " + points);
	if(position === 1) {
		// console.log("Position 1 points: " + points);
		points = points + 30;
		// console.log("Position 1 points: " + points);
	}else if(position === 2) {
		// console.log("Position 2 points: " + points);
		points = points + 20;
		// console.log("Position 2 points: " + points);
	}else if(position === 3) {
		// console.log("Position 3 points: " + points);
		points = points + 10;
		// console.log("Position 3 points: " + points);
	}
	return points;
}



// Until a better method is found ----> page reload every 20 secs
function update_content() {
	var tournamentId = $( "#playersForCheckin>tr button:first-child" ).attr("data-tournamentId");
   	console.log("Tournament id from url: " + tournamentId);

	$.get("/checkin/"+tournamentId, function(data) {
		// alert("reloaded!");
	});
}

$("#loginForm").on("submit", function(data){
	event.preventDefault();
	$.ajax({
      url: $('#loginForm').attr('action'),
      type: "post",
      data : $('#loginForm').serialize(),
      success: function(response){
      	console.log("Success!");
        window.location = response.redirect;
      },
      error: function(error){
      	console.log("Failure");
      	console.log(error);
      }
    });

});







