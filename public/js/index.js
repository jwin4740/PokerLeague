// Toggling signedIn and notSignedIn class (to display login/SignUp or Logout/LoggedIn:<username> buttons)

$("#loginErrorMessage").hide();


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
      	console.log(error);
      	$("#loginErrorMessage").show();
      }
    });

});
