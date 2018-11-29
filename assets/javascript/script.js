var topics = ["the office", "b99", "superstore", "community", "the good place"];

var giphyAPI = "bjggJV6O96rSqs1w9A4ivSwF6NFLgGTY";

var offset = 0;

$(document).ready(function() {

    // for-loop iterates through the topics array, creating button for each item in array
    for (var i = 0; i < topics.length; i++) {

        var topicsPlus = topics[i].split(' ').join('+');

        var btn = $('<button>');
        btn.addClass('btnClass');
        btn.attr('data-topic', topicsPlus);
        btn.text(topics[i]);
        $('#buttons').append(btn);

    };

    $('.btnClass').on('click', function() {

        var searchTerm = $(this).attr('data-topic');

        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + giphyAPI + "&offset=" + offset + "&limit=5",
            method: "GET"
        }).then(function(response) {
    
            for (var j = 0; j < response.data.length; j++) {
    
                var giphy = $('<img>');
                giphy.addClass('gifClass');
                giphy.attr('src', response.data[j].images.fixed_height_still.url);
                $('#gifs').prepend(giphy);
     
            }
    
        });

        offset += 5;

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