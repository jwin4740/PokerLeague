# PokerLeague
------------------------
## Requirements:- ##

### 1. Homepage ->
* Menu bar -> Logo on top-left linking to homepage. Top-right - Login and SignUp, (or Logout button if already signed in).
* Leaderboard with -> Ranking, Player_Name, Points, Date_Last_Played.
* Upcoming/ Open tournaments - Click to get info (info can be displayed in modal or a collapse panel), with Register button. Prompt user to login/signup before entering tournament. If already logged in, enter user as player in tournament.

#### 1.a. Login modal ->  
* Text box inputs for emailId and password.
* Forgot password button shows ‘Enter email’ input field - sends email with random temp password. (Tentative - figure out how).
* On click of Login button - redirect to 'User.html' page.

 ^^Validation important^^

### 2. User portal -> 
* Logout button on top-right.
* User’s details (some available for edit).
* Current tournaments user has registered for. With option to forfeit a tournament.

### 3. Admin portal ->
* Logout button on top-right.
* Admin details (Tentative requirement).
* Create A Tournament -> show hidden createTournament form -> Name, Date, Time.
* List all scheduled tournaments -> click on View to view list of players (CheckIn page). Edit button to edit name, date or time.

#### 3.a. CheckIn page -> 
* On click of View button -> show all players (who have registered for the tournament) with a Check-In button to Check them in once they are ready to play. 
* Start Tournament button at end of page -> Takes Admin to 'Tournament.html' page.

#### 3.b. Tournament page ->
* Display list of players in a box.
* As game progresses, Admin can drag-and-drop, or type (whichever we get around to completing) next to Ranking - this will also calculate points with each drag-and-drop or enter.
* End game button -> Calculated points are pushed to database. Redirect to main page (or Admin portal - TBD).

 ^^ Validation important ^^

### 4. Register page ->  
* Input fields for Name, UserName, emailId, password. 
* On Submit, populate database with details, added as role User (not Admin).
* Redirect to User portal.

 ^^Extensive validation required^^

-----------------------------

## Components required ->  


### 1. MODEL - Database -> MySQL -> 


* USER Table with ‘hashed’ passwords

	Id - PRIMARY KEY	| 	Email	|	Username | 	Password | 	Role
				

* TOURNAMENTS table 

	Id - PRIMARY KEY 	|	Name	|	Date	| 	Time	


* PLAYERS Table 

	Id - PRIMARY KEY 	| 	Player_Id - FOREIGN KEY To Id in USER table 	| 	Tournament_Id - FOREIGN KEY To Id in TOURNAMENTS table  	|  Points 	
	



### 2. VIEW - UI - HTML, CSS -> 6 pages - 6 routes.



### 3. CONTROLLER - Middleware -> 

* Api routes -> Get, Post, Delete, Put (to be configured in detailed design).
* HTML routes -> Routing for HTML pages, CSS pages, Images, etc.
* Sequelize -> Mapping to MySQL 

