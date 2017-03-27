



function onClick() {
    var form = document.getElementById("loginForm");

    form.submit();
}


const username = document.getElementById("userName");


$.get("/loggedIn", function(data) {
	if(data.loggedIn){
		username.textContent = data.uniqueID[3];
		$(".signedIn").toggleClass("hidden");
		$(".notSignedIn").toggleClass("hidden");
	}
	
});
