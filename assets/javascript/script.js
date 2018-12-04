var topics = ["the office", "superstore", "community", "the good place", "b99", "the mindy project"];

var giphyAPI = "bjggJV6O96rSqs1w9A4ivSwF6NFLgGTY"; // my giphy api key

var offset = 0; // sets offset so new gifs are reloaded

// wait for dom to load
$(document).ready(function() {

    // function to add topics buttons to screen
    function addBtns() {

        // clears topicBtns div to prevent duplicate buttons
        $('#topicBtns').empty();

        // for-loop iterates through the topics array, creating button for each item in array
        for (var i = 0; i < topics.length; i++) {

            // replace spaces in topic with plus signs
            var topicsPlus = topics[i].split(' ').join('+');
    
            // create buttons
            var btn = $('<button>');
            btn.addClass('btnClass');
            btn.attr('data-topic', topicsPlus); // add data-topic attribute, will become our search term
            btn.text(topics[i]);
            $('#topicBtns').append(btn);
    
        };

    };

    // clear gifs button
    $('#clear').on('click', function() {

        // removes all uploaded gifs
        $('#gifs').empty();

        // resets the topics array to original length
        var resetTopics = topics.splice(6, topics.length);

        // resets offset 
        offset = 0;

        // readds buttons from reset topics array
        addBtns();

    });

    // adds new button for user generated newTopic
    $("#submitBtn").on("click", function(event) {
        event.preventDefault();

        // establishes variable to hold user input
        var newTopic = $("#newTopic").val().toLowerCase().trim();

        // only adds buttons if input field is not blank and topic has not already been added
        if (newTopic != '' && topics.indexOf(newTopic) === -1) {

            // adds user input to topics array
            topics.push(newTopic);

            // readds buttons from updated topics array
            addBtns();

            // clears text value in from
            $('#newTopic').val('');
        
        };

    });

    // load gifs on button click
    $('#topicBtns').on('click', 'button.btnClass', function() {

        // grab data-topic (topic with plus signs instead of spaces)
        var searchTerm = $(this).attr('data-topic');

        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + giphyAPI + "&offset=" + offset + "&limit=10",
            method: "GET"
        }).then(function(response) {
    
            // adds gifs!
            for (var j = 0; j < response.data.length; j++) {
    
                var giphy = $('<img>');
                giphy.addClass('gifClass');
                giphy.attr('src', response.data[j].images.fixed_height_still.url);
                $('#gifs').prepend(giphy);
     
            };
    
        });

        // ensures we'll always see a new batch of gifs
        offset += 10;

    });

    // toggle still image with gif on click
    $('#gifs').on('click', 'img.gifClass', function() {

        var URL = $(this).attr('src');

        if (URL.includes('_s')) {
            $(this).attr('src', URL.replace('_s',''));
        }
        else {
            $(this).attr('src', URL.replace('.gif','_s.gif'));
        }

    });
   
    addBtns();

});
