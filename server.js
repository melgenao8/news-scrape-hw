// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");
var scrapedNYtimes = require("./routes/scrape");
var PORT = process.env.PORT || 3000;

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
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
// Add routes, both API and view
// app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/##");


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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

// Retrieve data from the db
app.get("/scrape", function (req, res) {
    // refer to scrape.js
    axios.get("http://www.nytimes.com").then(function (response) {
        var $ = cheerio.load(response.data);

        console.log("\n***********************************\n" +
            "Grabbing the latest articles" +
            "from New York Times" +
            "\n***********************************\n");


        // Save scrapped articles in this empty array
        // var articles = [];


        $(".css-8atqhb").each(function (i, element) {


            // ============================================
            // Headline - the title of the article
            // Summary - a short summary of the article
            // URL - the url to the original article

            //  HEADLINE
            var title = $(element).find("h2").text();

            // Grab the URL of the article
            var link = $(element).find("a").attr("href");

            // Grab the summary of the article
            var sum = $(element).find("p").text();


            console.log("Title:" + title, "Link:" + link, "Sum:" + sum);
            // If this found element had both a title and a link
            if (title && link && sum) {
                // Insert the data in the scrapedData db
                db.NYTscrapedData.insert({
                    title: title,
                    link: link,
                    sum: sum
                },
                    function (err, inserted) {
                        if (err) {
                            // Log the error if one is encountered during the query
                            console.log(err);
                        }
                        else {
                            // Otherwise, log the inserted data
                            console.log(inserted);
                        }
                    });
            }
        });
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

        // res.json({ "status": "Successful 200" });
    });
});


//scrapped data




app.listen(PORT, function () {
    console.log("App listening http://localhost:" + PORT);


});

