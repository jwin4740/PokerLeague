



// if(sessionStorage.length === 0 ) {

// }



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


