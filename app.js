/**
 * Main file of the application.
 * Initializes the application and starts the server.
 */
var Sequelize = require("sequelize");
var express = require('express');
var app = express();


/*Local*/

var sequelize = new Sequelize('notes', 'root', '', {
    host: "localhost",
    port: 3306,
    dialect: 'mysql'
});




//Initialize the application
var initializers = require('./server/initializers/initialize')(app, express,sequelize);

//starts the server
var port = process.env.PORT || 4000;
app.listen(port, function() {
	console.log('Express server listening on port : ' + port);
});

