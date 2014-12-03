/* Custom functions */
/* TODO: Comment Code
 * TODO: Optimize code */

//Hamburger Menu
function hamburgerClose(){
    $('.top-overlay').animate({
        marginLeft: -1080
    }, { duration: 250, queue: false }).promise().done(function(){
        $('div.top-overlay').remove();
        $('div.bottom-overlay').remove();
    });
}

function hamburgerOpen() {
    $('.main-content').prepend('<div class="top-overlay"></div><div class="bottom-overlay"></div>');
    $('.top-overlay').append('<ul></ul>');
    $('.top-overlay ul').append(
        '<a href="#votdTarget" id="votd" onclick="hamburgerClose()"><li class="hamburger-item">Verse of the Day</li></a>' +
        '<a href="#newsTarget" id="news" onclick="hamburgerClose()"><li class="hamburger-item">Campus News</li></a>' +
        '<a href="#chapelTarget" id="chapel" onclick="hamburgerClose()"><li class="hamburger-item">Chapel</li></a>' +
        '<a href="#scheduleTarget" id="schedule" onclick="hamburgerClose()"><li class="hamburger-item">Class Schedule</li></a>' +
        '<a href="#baldwinTarget" id="baldwin" onclick="hamburgerClose()"><li class="hamburger-item">Baldwin Menu</li></a>' +
        '<a href="#radioTarget" id="radio" onclick="hamburgerClose()"><li class="hamburger-item">The Fortress</li></a>' +
        '<a href="#weatherTarget" id="weather" onclick="hamburgerClose()"><li class="hamburger-item">Weather</li></a>'
    ).promise().done(function () {
            $('.top-overlay').animate({
                margin: 0
            }, {duration: 250, queue: false});
        });
}

// Baldwin
function baldwinBreakfast(){
    $(".card-baldwin-item").toggleClass("baldwin-disable");
    $("#baldwin-item-0").removeClass("baldwin-disable").toggleClass("baldwin-active").promise().done(function(){
        $("#baldwin-carousel-0").owlCarousel({
            items:      2,
            nav:        false,
            dots:       false
        });
    });
}

function baldwinLunch(){
    $(".card-baldwin-item").toggleClass("baldwin-disable");
    $("#baldwin-item-1").removeClass("baldwin-disable").toggleClass("baldwin-active").promise().done(function(){
        $("#baldwin-carousel-1").owlCarousel({
            items:      2,
            nav:        false,
            dots:       false
        });
    });
}

function baldwinDinner(){
    $(".card-baldwin-item").toggleClass("baldwin-disable");
    $("#baldwin-item-2").removeClass("baldwin-disable").toggleClass("baldwin-active").promise().done(function(){
        $("#baldwin-carousel-2").owlCarousel({
            items:      2,
            nav:        false,
            dots:       false
        });
    });
}

// Radio
function radio(){
    $('#radioPlay').click(function(){
        $('#radioPlay').toggleClass('radio-start');
        if($('#radioPlay').hasClass('radio-start') == true){
            $('#controls').removeClass('flaticon-play43').addClass('flaticon-pause27');
        }
        else{
            $('#controls').removeClass('flaticon-pause27').addClass('flaticon-play43');
        }
    });

}
