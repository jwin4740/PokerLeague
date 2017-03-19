# PokerLeague
------------------------
## Requirements:- ##

### 1. Homepage### ->
    1. leaderboard displaying player name, points, date played, tournament name, ranking.
    2. Menu bar with logo on left linking to homepage, right-hand-side links to Login page, Signup page, tournament lists (scrolling down Homepage will show tournament lists), gallery of winners.
    3. Scroll down to show tournament lists, time and location - clicking this, will let user login/signup before entering tournament. If already logged in, enter user as player in tournament.

### 2. User portal -> 
    1. Display user’s details (available to edit), current tournaments user has signed up for, Ranking/ points obtained per tournament.
    2. Current tournaments signed up for by user. With the ranking/ points obtained per tournament.
    3. Option to forfeit from a tournament.

### 3. Admin portal ->
    1. Admin details (Tentative requirement).
    2. Delete (Cascade delete in relational database - check on way to implement it) or Create a tournament - specify name, date, rules. (Similar to Bamazon HW Assignment 12).
    3. View a list of players per tournament. Add or remove players from tournaments.(Similar to Bamazon HW Assignment 12).
    4. Validation required.

### 4. Login modal ->  
    1. Text box inputs for username and password.
    2. Forgot password button shows ‘Enter email’ modal and sends email with interim password. (Tentative - figure out how).
    3. On click of login - reload home page with user’s name + username displayed and user-specific data (to be figured out).
    4. Validation important.

### 5. Sign up page ->  
    1. Usual form with text boxes and code to push to database on submit. 
    2. Extensive validation required.

### 6. Gallery ->  
    1. Images displayed using Ajax call (get request) to wherever winner images are stored. (Similar to Giphy app HW Assignment 6).


-----------------------------

## Components required ->  


### 1. MODEL -  ### Database -> MySQL -> 


	1. Authentication Table with ‘hashed’ passwords (until a better method is proposed)

Id - Primary key	| 	Username | 	Password | 	Role
				
	2. User Table 

Id - Primary key 	| 	Name 	| 	Username - Foreign key 	| 	Tournaments - Foreign key 	| 	Date played	|  Total Points 	| 	Scores	 | 	 ——?
	
	3. Tournaments table 

Id - Primary key 	|	Name	|	Location	|	Dates	| 	Prize	| 	——?



### 2. VIEW - ### UI - HTML, CSS -> 5 pages - 5 routes.



### 3. CONTROLLER - ### Middleware -> 

    1. Api routes -> Get, Post, Delete, Put (to be configured in detailed design)
    2. HTML routes -> Routing for HTML pages, CSS pages, Images, etc.
    3. Sequelize -> Mapping to MySQL 

