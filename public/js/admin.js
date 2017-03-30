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
$("#tournamentsList").on("click", ".tournamentData>.undoEditClick", function() {
	event.preventDefault();
	console.log("Undo edit");
//*	// Get new values from fields
	var date = $(this).parent().find(".tournamentDate").val();
	var time = $(this).parent().find(".tournamentTime").val();
	// Change textboxes back to text type with a value formatted back to original displayed format
	$(this).parent().find(".tournamentDate").attr('type', 'text').attr("value", moment(date, "YYYY-MM-DD").format("ll"));
	$(this).parent().find(".tournamentTime").attr('type', 'text').attr("value", moment(time, "HH:mm").format("LT"));
	// Disable edit and add non-editable css class
	$(this).parent().find(".editBoxes").attr('disabled', true).addClass("non-editable");
	// Show the edit button
	$(this).parent().children(".edit").show();
	// Toggle display of Update, Delete and Undo edit buttons
	$(this).parent().children(".editButtons").toggleClass("hidden");
//*

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
	var tournament_id = $(this).attr("data-tournamentId");

	var tournamentObject = {
		TournamentId: tournament_id,
		TournamentName: tournament_name,
		TournamentDate: tournament_date,
		TournamentTime: tournament_time
	};
 	

// Fire an ajax put/post (?) /update/tournament
	$.ajax({
		method: "PUT",
		url: "/update/tournament",
		data: tournamentObject
	})
	.done(function(data) {
		console.log(data);
		console.log("tournament updated");
	})
});

// In API routes, /update/tournament, do a sequelize UPDATE tournament set tournament name, date, time = values received, Where id = tournamentId
// .then(function(data) {res.send("Updated")})
// "Updated" will be received in the ajax.done(function(data){console.log(data)})
// Change back the editable fields by writing code written above between the //* and //*
// For better error handling, write a .catch in api-routes and a .fail in ajax call here


// DELETE BUTTON TO "DELETE" TOURNAMENT FROM DB
// On click of Delete button,
// Get tournamentId from parent div of button clicked
// Fire an ajax put to /delete/tournament
// In API routes, /delete/tournament, do a sequelize UPDATE set active_flag = 0 where tournamentid = tournamentID
// .then(function(data) {res.send("Deleted")})
// "Deleted" will be received in the ajax.done(function(data){console.log(data)})
// Change back the editable fields by writing code written above between the //* and //*
// For better error handling, write a .catch in api-routes and a .fail in ajax call here


$("#logoutButton").on("click", function(){
	sessionStorage.clear();
});


	$(".non-editable").attr('disabled', true);
});

//// Update button puts modifies db data
// $("#tournamentsList").on("click", ".tournamentData>.update", function(event) {
// 	event.preventDefault();
// 	console.log($(this).parent());
// 	var tournament_id = $(this).attr("data-tournamentId");
// 	// var tournament_name = $(;
// 	// var tournament_date = $(this).attr("data-tournamentDate");
// 	// var tournament_time = $(this).attr("data-tournamentTime");
// 	console.log(tournament_id);
// 	var tournamentObject = {
// 		TournamentId: tournament_id,
// 		TournamentName: tournament_name,
// 		TournamentDate: tournament_date,
// 		TournamentTime: tournament_time
// 	};

// 	$.ajax({
// 		method: "PUT",
// 		url: "/update/tournament",
// 		data: tournamentObject
// 	})
// 	.done(function(data) {
// 		console.log(data);
// 		console.log("tournament updated");
// 	})
// });

// // Delete buttons removes that tournament from db data
// $("#tournamentsList").on("click", ".tournamentData>.delete", function(event) {
// 	event.preventDefault();
// 	console.log("deleting tournament data");

// });


