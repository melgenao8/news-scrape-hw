var cheerio = require("cheerio");
var axios = require("axios");


// =========== Function that scrapes NYTimes site ===========
var scrapedNYtimes = function () {

    return axios.get("http://www.nytimes.com").then(function (response) {
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
            var link = $(element).children("a").attr("href");

            // Grab the summary of the article
            var sum = $(element).find("p").text();

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


        }
        });
});
};


module.exports = scrapedNYtimes;


// ??????????????? does this go in server.js file?

//  // saving info I scraped into new variables
//  var headInfo = title
//  var sumInfo = sum
//  var urlInfo = link

//  // ============================================

//  // create object --> push this object into ARTICLE array
//  var collectedData = {
//      headline: headInfo,
//      summary: sumInfo,
//      url: "https://www.nytimes.com" + urlInfo
//  };
//  // pushing New articles into ARTICLE array
//  collectedData.push(articles);