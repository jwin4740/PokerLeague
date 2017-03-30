$(document).ready(function() {

	if(sessionStorage.length === 0 ) {
		$.get("/loggedIn", function(data) {
			if(data.loggedIn){
				console.log(data);
			sessionStorage.userEmail = data.uniqueID[0];
			sessionStorage.role = data.uniqueID[1];
			sessionStorage.userID = data.uniqueID[2];
			sessionStorage.username = data.uniqueID[3];
			console.log(sessionStorage);
			}
		});
	}

	// Tournament buttons functionality
	// Edit button shows all edit buttons
	$("#tournamentsList").on("click", ".tournamentData>.edit", function(event) {
		event.preventDefault();
		// Enable edit and remove non-editable css class
		$(this).parent().find(".editBoxes").attr('disabled', false).removeClass("non-editable");
		console.log("Edit enabled");
		// Get values from fields
		var date = $(this).parent().find(".tournamentDate").val();
		var time = $(this).parent().find(".tournamentTime").val();
		// console.log(moment(date, "ll").format("YYYY MM DD"));
		// Change textboxes to date and time types respectively with a formatted value recognizable by those types
		$(this).parent().find(".tournamentDate").attr('type', 'date').attr("value", moment(date, "ll").format("YYYY-MM-DD"));
		$(this).parent().find(".tournamentTime").attr('type', 'time').attr("value", moment(time, "hh:mm A").format("HH:mm"));
		// Hide the edit button
		$(this).hide();
		// Toggle display of Update, Delete and Undo edit buttons
		$(this).parent().find(".editButtons").toggleClass("hidden");
	});


	// Undo Edit button hides edit buttons and shows Edit button
	$("#tournamentsList").on("click", ".tournamentData>.undoEditClick", function(event) {
		event.preventDefault();
		console.log("Undo edit");
		var buttonObject = $(this);
		// Calling function to change input textbox editable to non-editable and disabled
		changeBackFromEdit(buttonObject);

	});


	// UPDATE BUTTON TO MODIFY TOURNAMENT DB DATA
	// On click of Update button,
	$("#tournamentsList").on("click", ".tournamentData>.update", function(event) {
		event.preventDefault();

	// Get val() from each of the textboxes,
		var tournament_name = $(this).parent().find(".tournamentName").val();
		var tournament_date = $(this).parent().find(".tournamentDate").val();
		var tournament_time = $(this).parent().find(".tournamentTime").val();
		console.log(tournament_name);
	// Get tournamentId from the parent div of the button clicked
		var tournament_id = $(this).parent().attr("id");

		var tournamentObject = {
			TournamentId: tournament_id,
			TournamentName: tournament_name,
			TournamentDate: tournament_date,
			TournamentTime: tournament_time
		};
	 	
	 	var buttonObject = $(this);

	// Fire an ajax put/post /update/tournament
		$.ajax({
			method: "PUT",
			url: "/update/tournament",
			data: tournamentObject
		})
		.success(function(data) {
			console.log(data);
			console.log("tournament updated");
			changeBackFromEdit(buttonObject);
		})/////// Configure error/fail condition, on db crash (display 500 error page from api-routes). This only works if server crashes. /////
		.fail(function(err) {
			console.log(err);
			buttonObject.parent().append("<p> Update failed. Please try again.</p>");
		});
	});

// Tournament buttons functionality
// Edit button shows all edit buttons
$("#tournamentsList").on("click", ".tournamentData>.edit", function(event) {
	event.preventDefault();
	console.log("I clicked");
	$(this).parent().children(".editable").toggleClass("hidden");
	$(this).parent().children(".non-editable").hide();
	$(this).hide();
	$(this).parent().children(".editButtons").toggleClass("hidden");
});
// Undo Edit button hides edit buttons and shows Edit button
$("#tournamentsList").on("click", ".tournamentData>.undoEditClick", function() {
	event.preventDefault();
	console.log("I unclicked");
	$(this).parent().children(".editable").toggleClass("hidden");
	$(this).parent().children(".non-editable").show();
	$(this).parent().children(".edit").show();
	$(this).parent().children(".editButtons").toggleClass("hidden");
});
// Update button puts modifies db data

// Delete buttons removes that tournament from db data


	// DELETE BUTTON TO "DELETE" TOURNAMENT FROM DB
	// On click of Delete button,
	$("#tournamentsList").on("click", ".tournamentData>.delete", function(event) {
		event.preventDefault();

	// Get val() from each of the textboxes,
		var tournament_name = $(this).parent().find(".tournamentName").val();
		var tournament_date = $(this).parent().find(".tournamentDate").val();
		var tournament_time = $(this).parent().find(".tournamentTime").val();
		console.log(tournament_name);
	// Get tournamentId from the parent div of the button clicked
		var tournament_id = $(this).parent().attr("id");
		console.log(tournament_id);

		var tournamentObject = {
			TournamentId: tournament_id,
			TournamentName: tournament_name,
			TournamentDate: tournament_date,
			TournamentTime: tournament_time
		};
	 	
	 	var buttonObject = $(this);

	// Fire an ajax put to /delete/tournament
		$.ajax({
			method: "PUT",
			url: "/delete/tournament",
			data: tournamentObject
		})
		.success(function(data) {
			console.log(data);
			console.log("tournament deleted");
			buttonObject.parent().parent().parent().remove();
		})/////// Configure error/fail condition, on db crash (display 500 error page from api-routes). This only works if server crashes. /////
		.fail(function(err) {
			console.log(err);
			buttonObject.parent().append("<p> Delete failed. Please try again.</p>");
		});
	});


	$("#logoutButton").on("click", function(){
		sessionStorage.clear();
	});


	$(".non-editable").attr('disabled', true);
});

<<<<<<< HEAD
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
=======
// Function to change input textbox editable to non-editable and disabled
function changeBackFromEdit(buttonObject) {
	var date = buttonObject.parent().find(".tournamentDate").val();
	var time = buttonObject.parent().find(".tournamentTime").val();
	// Change textboxes back to text type with a value formatted back to original displayed format
	buttonObject.parent().find(".tournamentDate").attr('type', 'text').attr("value", moment(date, "YYYY-MM-DD").format("ll"));
	buttonObject.parent().find(".tournamentTime").attr('type', 'text').attr("value", moment(time, "HH:mm").format("LT"));
	// Disable edit and add non-editable css class
	buttonObject.parent().find(".editBoxes").attr('disabled', true).addClass("non-editable");
	// Show the edit button
	buttonObject.parent().children(".edit").show();
	// Toggle display of Update, Delete and Undo edit buttons
	buttonObject.parent().children(".editButtons").toggleClass("hidden");
}


>>>>>>> e10658b604a1e4978797765bbd1536b6dbaa1d5c

