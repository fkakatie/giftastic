var topics = ["the office", "superstore", "community", "the good place", "b99", "the mindy project"];

var giphyAPI = "bjggJV6O96rSqs1w9A4ivSwF6NFLgGTY"; // my giphy api key

var offset = 0; // sets offset so new gifs are reloaded

var favedGifs= [];

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

                var giphyDiv = $('<div>');
                giphyDiv.addClass('divClass');

                var giphyGrid = $('<div>');
                giphyGrid.addClass('gridClass');
    
                var giphy = $('<img>');
                giphy.addClass('gifClass');
                giphy.attr('src', response.data[j].images.fixed_height_still.url);             

                var rating = $('<p>');
                rating.addClass('rating');
                rating.html('RATED ' + response.data[j].rating.toUpperCase());

                // var faveBtn = $('<p>');
                // faveBtn.addClass('faveClass');
                // faveBtn.html('<i class="far fa-star"></i>');

                giphyGrid.append(giphy).append(rating)
                // giphyGrid.append(faveBtn);

                giphyDiv.append(giphy).append(rating);

                $('#gifs').prepend(giphyDiv);
     
            };
    
        });

        // ensures we'll always see a new batch of gifs
        offset += 10;

    });

    // toggle fave star on hover/click
    // $(document).on('click', 'p.faveClass', function() {

    //     var star = $(this).html();

    //     console.log(favedGifs);

    //     var starredHTML = ($(this).parent().parent().html());

    //     console.log(starredHTML);

    //     if (star.includes('far')) {
    //         $(this).html('<i class="fas fa-star"></i>');
    //         $(this).addClass('favedClass');

    //         if (starredHTML.includes('_s')) {
                
    //         }

    //         // favedGifs.push()
    //     }
    //     else {
    //         $(this).html('<i class="far fa-star"></i>');
    //         $(this).removeClass('favedClass');
    //     };
        
    // });

    function hideSidebar() {
        $('div.container').addClass('invisible');
        $('.sidebar').addClass('slide');
        $('section.mainBody').addClass('slide plus');
    };

    function showSidebar() {
        $('.sidebar').removeClass('slide');
        $('section.mainBody').removeClass('slide plus');
        $('div.container').removeClass('invisible');
    };

    // slides sidebar in and out
    $('#headerBtn').on('click', function() {

        var headDiv = $(this).html();

        if (headDiv.includes('times')) {
            $(this).html(headDiv.replace('times','bars'));
            hideSidebar();
        }
        else {
            $(this).html(headDiv.replace('bars','times'));
            showSidebar();
        }

        console.log(this);
        console.log(headDiv);

    });

    // toggle still image with gif on click
    $('#gifs').on('click', 'img.gifClass', function() {

        var URL = $(this).attr('src');

        if (URL.includes('_s')) {
            $(this).attr('src', URL.replace('_s',''));
        }
        else {
            $(this).attr('src', URL.replace('.gif','_s.gif'));
            $('.rating').removeClass('invisible');
        }

    });
   
    addBtns();

});
