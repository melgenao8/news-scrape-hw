// We'll be rewriting the table's data frequently, so let's make our code more DRY
// by writing a function that takes in 'articles' (JSON) and creates a table body
function displayResults(articles) {
    // First, empty the table
    $("tbody").empty();

    // Then, for each entry of that json...
    articles.forEach(function (article) {
        // Append each of the article's properties to the table
        var tr = $("<tr>").append(
            $("<td>").text(article.title),
            $("<td>").text(article.link),
            $("<td>").text(article.sum),
        );

        $("tbody").append(tr);
    });
}

// Bonus function to change "active" header
function setActive(selector) {
    // remove and apply 'active' class to distinguish which column we sorted by
    $("th").removeClass("active");
    $(selector).addClass("active");
}

// 1: On Load
// ==========

// First thing: ask the back end for json with all articles
$.getJSON("/all", function (data) {
    // Call our function to generate a table body
    displayResults(data);
});

// 2: Button Interactions
// ======================

// // user clicks the SCRAPE NEW ARTICLES button --> display table
// $("#scrapeNewButton").on("click", function () {
//     // Set new column as currently-sorted (active)
//     // setActive("#article-weight");

//     // Do an api call to the back end for json with all articles
//     $.getJSON("/articles", function (data) {
//         // Call our function to generate a table body
//         displayResults(data);
//     });
// });

// user clicks the SAVED ARTICLES button --> display saved articles in table
$("#savedButton").on("click", function () {
    // Set new column as currently-sorted (active)
    setActive("#savedArticles");

    // Do an api call to the back end for json with all articles sorted by name
    $.getJSON("/savedArticles", function (data) {
        // Call our function to generate a table body
        displayResults(data);
    });
});


// DELETE ARTICLES button --> deletes ALL articles
$("#clearArticlesButton").on("click", function () {
  
    // Do an api call to the back end for json with all articles sorted by name
    $.getJSON("/", function (data) {
        // Call our function to generate a table body
        displayResults(data);
    });
});




