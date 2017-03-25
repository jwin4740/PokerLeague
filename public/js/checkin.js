var playerName = "";

$("#checkedInPlayers").empty();

$("#startTournament").click(function checkMeIn() {

    playerName = $("#playerName").val().trim();
});

// Output all of the new information into the Registered Players section
$("#checkedInPlayers").append("<tr>");
$("#checkedInPlayers").append("<td>" + playerName + "</td>");
$("#checkedInPlayers").append("</tr>");