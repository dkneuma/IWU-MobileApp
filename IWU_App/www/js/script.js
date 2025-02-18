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
    $("section.header").removeAttr('style');
    $("section.main-content").removeAttr('style');
}

function hamburgerOpen() {
    /* TODO: Prevent scroll while open */

    $('.main-content').prepend('<div class="top-overlay"></div><div class="bottom-overlay"></div>');
    $('.top-overlay').append('<ul></ul>');
    $('.top-overlay ul').append(
        '<a href="#votdTarget" id="votd" class="menu-item" onclick="hamburgerClose()"><li class="hamburger-item">Verse of the Day</li></a>' +
        '<a href="#newsTarget" id="news" class="menu-item" onclick="hamburgerClose()"><li class="hamburger-item">Campus News</li></a>' +
        '<a href="#chapelTarget" id="chapel" class="menu-item" onclick="hamburgerClose()"><li class="hamburger-item">Chapel</li></a>' +
        '<a href="#scheduleTarget" id="schedule" class="menu-item" onclick="hamburgerClose()"><li class="hamburger-item">Class Schedule</li></a>' +
        '<a href="#baldwinTarget" id="baldwin" class="menu-item" onclick="hamburgerClose()"><li class="hamburger-item">Baldwin Menu</li></a>' +
        '<a href="#radioTarget" id="radio" class="menu-item" onclick="hamburgerClose()"><li class="hamburger-item">The Fortress</li></a>' +
        '<a href="#weatherTarget" id="weather" class="menu-item" onclick="hamburgerClose()"><li class="hamburger-item">Weather</li></a>' +
        '<a href="#weatherTarget" id="weather" class="menu-item" onclick="hamburgerClose()"><li class="hamburger-item no-border"></li></a>' +
        '<a href="#weatherTarget" id="weather" class="menu-item" onclick="hamburgerClose()"><li class="hamburger-item no-border"></li></a>' +
        '<a href="#weatherTarget" id="weather" class="menu-item" onclick="hamburgerClose()"><li class="hamburger-item no-border"></li></a>'
    ).promise().done(function () {
            $('.top-overlay').animate({
                margin: 0
            }, {duration: 250, queue: false});
            $("section.header").css("position", "relative");
            $("section.main-content").css("marginTop", "0");
        });
}

// Baldwin
function baldwinBreakfast(){
    $(".card-baldwin-item").toggleClass("baldwin-disable");
    $("#baldwin-item-0").removeClass("baldwin-disable").toggleClass("baldwin-active").promise().done(function(){
        $("#baldwin-carousel-0").owlCarousel({
            items:      1,
            nav:        false,
            dots:       false
        });
    });
}

function baldwinLunch(){
    $(".card-baldwin-item").toggleClass("baldwin-disable");
    $("#baldwin-item-1").removeClass("baldwin-disable").toggleClass("baldwin-active").promise().done(function(){
        $("#baldwin-carousel-1").owlCarousel({
            items:      1,
            nav:        false,
            dots:       false
        });
    });
}

function baldwinDinner(){
    $(".card-baldwin-item").toggleClass("baldwin-disable");
    $("#baldwin-item-2").removeClass("baldwin-disable").toggleClass("baldwin-active").promise().done(function(){
        $("#baldwin-carousel-2").owlCarousel({
            items:      1,
            nav:        false,
            dots:       false
        });
    });
}

// Radio
function radio(){
    $('#radioPlay').click(function(){
        $('#radioPlay').toggleClass('radio-start');
        if($(this).hasClass('radio-start') == true){
            $('#controls').removeClass('flaticon-play43').addClass('flaticon-pause27');
            var radio = document.getElementById("radioPlayer");
            radio.play();
        }
        else{
            $('#controls').removeClass('flaticon-pause27').addClass('flaticon-play43');
            var radio = document.getElementById("radioPlayer");
            radio.pause();
        }
    });
}
