var btnOptions = ["the office", "b99", "superstore", "community"];

$(document).ready(function() {

    // for-loop iterates through the btnOptions array, creating button for each item in array
    for (var i = 0; i < btnOptions.length; i++) {

        var btnOptionsPlus = btnOptions[i].split(' ').join('+');

        var btn = $('<button>');
        btn.addClass('btnClass');
        btn.attr('data-option', btnOptionsPlus);
        btn.text(btnOptions[i]);
        $('#buttons').append(btn);

    };

    $('.btnClass').on('click', function() {

        console.log($(this).attr('data-option'));

    });

})