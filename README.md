# PokerLeague
------------------------
## Requirements:- ##

### 1. Homepage ->
* leaderboard displaying player name, points, date played, tournament name, ranking.
* Menu bar with logo on left linking to homepage, right-hand-side links to Login page, Signup page, tournament lists (scrolling down Homepage will show tournament lists), gallery of winners.
* Scroll down to show tournament lists, time and location - clicking this, will let user login/signup before entering tournament. If already logged in, enter user as player in tournament.

### 2. User portal -> 
* Display user’s details (available to edit), current tournaments user has signed up for, Ranking/ points obtained per tournament.
* Current tournaments signed up for by user. With the ranking/ points obtained per tournament.
* Option to forfeit from a tournament.

### 3. Admin portal ->
* Admin details (Tentative requirement).
* Delete (Cascade delete in relational database - check on way to implement it) or Create a tournament - specify name, date, rules. (Similar to Bamazon HW Assignment 12).
* View a list of players per tournament. Add or remove players from tournaments.(Similar to Bamazon HW Assignment 12).
* Validation required.

### 4. Login modal ->  
* Text box inputs for username and password.
* Forgot password button shows ‘Enter email’ modal and sends email with interim password. (Tentative - figure out how).
* On click of login - reload home page with user’s name + username displayed and user-specific data (to be figured out).
* Validation important.

### 5. Sign up page ->  
* Usual form with text boxes and code to push to database on submit. 
* Extensive validation required.

### 6. Gallery ->  
* Images displayed using Ajax call (get request) to wherever winner images are stored. (Similar to Giphy app HW Assignment 6).


-----------------------------

## Components required ->  


### 1. MODEL - Database -> MySQL -> 


* Authentication Table with ‘hashed’ passwords (until a better method is proposed)

	Id - Primary key	| 	Username | 	Password | 	Role
				
* User Table 

	Id - Primary key 	| 	Name 	| 	Username - Foreign key 	| 	Tournaments - Foreign key 	| 	Date played	|  Total Points 	| 	Scores	 | 	 ——?
	
* Tournaments table 

	Id - Primary key 	|	Name	|	Location	|	Dates	| 	Prize	| 	——?



### 2. VIEW - UI - HTML, CSS -> 5 pages - 5 routes.



### 3. CONTROLLER - Middleware -> 

* Api routes -> Get, Post, Delete, Put (to be configured in detailed design)
* HTML routes -> Routing for HTML pages, CSS pages, Images, etc.
* Sequelize -> Mapping to MySQL 

