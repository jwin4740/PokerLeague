// Toggling signedIn and notSignedIn class (to display login/SignUp or Logout/LoggedIn:<username> buttons)
if(sessionStorage.length !== 0){
		$("#userName").text(sessionStorage.username);
		$(".signedIn").toggleClass("hidden");
		$(".notSignedIn").toggleClass("hidden");

		if(sessionStorage.role === 'user'){
			$("#loginLink").attr('href', '/user/' + sessionStorage.userID);
		} else if(sessionStorage.role === 'admin'){
			$("#loginLink").attr('href', '/admin');
		}
	}

$("#logoutButton").on("click", function(){
	sessionStorage.clear();
});

$(".register").on("click", function() {
	if(sessionStorage.length !== 0) {
		if(sessionStorage.role === "user"){
			window.location = "/user/" + sessionStorage.userID;
		} else if(sessionStorage.role === "admin"){
			window.location = "/admin";
		}
	}else {
		$('#loginModal').modal('show'); 
	}
});

