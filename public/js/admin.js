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

 
$("#logoutButton").on("click", function(){
	sessionStorage.clear();
});

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

