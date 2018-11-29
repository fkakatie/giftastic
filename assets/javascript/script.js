var topics = ["the office", "b99", "superstore", "community", "the good place"];

var giphyAPI = "bjggJV6O96rSqs1w9A4ivSwF6NFLgGTY"; // my giphy api key

var offset = 0; // sets offset so new gifs are reloaded

// wait for dom to load
$(document).ready(function() {

    // for-loop iterates through the topics array, creating button for each item in array
    for (var i = 0; i < topics.length; i++) {

        // replace spaces in topic with plus signs
        var topicsPlus = topics[i].split(' ').join('+');

        // create buttons
        var btn = $('<button>');
        btn.addClass('btnClass');
        btn.attr('data-topic', topicsPlus); // add data-topic, will become our search term
        btn.text(topics[i]);
        $('#buttons').append(btn);

    };

    // load gifs on button click
    $('.btnClass').on('click', function() {

        // grab data-topic (topic with plus signs instead of spaces)
        var searchTerm = $(this).attr('data-topic');

        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + giphyAPI + "&offset=" + offset + "&limit=10",
            method: "GET"
        }).then(function(response) {
    
            for (var j = 0; j < response.data.length; j++) {
    
                var giphy = $('<img>');
                giphy.addClass('gifClass');
                giphy.attr('src', response.data[j].images.fixed_height_still.url);
                $('#gifs').prepend(giphy);
     
            }
    
        });

        offset += 10;

    });

    $('#gifs').on('click', 'img.gifClass', function() {

        console.log('this works!');

        var URL = $(this).attr('src');

        if (URL.includes('_s')) {
            $(this).attr('src', URL.replace('_s',''));
        }
        else {
            $(this).attr('src', URL.replace('.gif','_s.gif'));
        }

    });
   
    $('#clear').on('click', function() {

        $('#gifs').empty();
        offset = 0;

    });

});
