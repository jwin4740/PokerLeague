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


$("#logoutButton").on("click", function(){
	sessionStorage.clear();
});

