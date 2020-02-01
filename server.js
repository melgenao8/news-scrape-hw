// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");


// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "NYTscraper";
var collections = ["NYTscrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});


// ROUTES
// Main route (simple Hello World Message)
app.get("/", function (req, res) {
    res.send("Hello world");
});

// Retrieve data from the db
app.get("/all", function (req, res) {
    // Find all results from the scrapedData collection in the db
    db.NYTscrapedData.find({}, function (error, found) {
        // Throw any errors to the console
        if (error) {
            console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {
            res.json(found);
        }
    });
});

//scrapped data
// PORT

var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("App listening http://localhost:" + PORT);


});

