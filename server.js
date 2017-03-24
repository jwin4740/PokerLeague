// *****************************************************************************
// Server.js - Initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var expressValidator = require('express-validator');
var expressSession = require('express-session');


// Set up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring models for syncing
var db = require("./models");

// Set up Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
//After the body is parsed, it's time for validation
//this starts the express validator
app.use(expressValidator());

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory
app.use(express.static("./public"));
//At the end here we add express session
//Express Session
app.use(expressSession({
	secret: 'secret',
	//If saveUnitialized is set to true it will save a session to our session storage even if it is not initialized 
	saveUninitialized: false,
	//If resave is set to true it will save our session after each request
	//false will only save if we change something
	resave: false
}));

// Routes =============================================================

// Requiring html-routes.js to route html files
require("./controllers/html-routes.js")(app);
require("./controllers/api-routes.js")(app);

// Syncing sequelize models, then starting express app
db.sequelize.sync({force: false}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});



