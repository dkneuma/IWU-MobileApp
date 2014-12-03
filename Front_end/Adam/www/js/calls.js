/* Function Calls */
/* TODO: Comment Code
 * TODO: Optimize Code */


$(document).ready(function() {

    // Ajax
    //news();
    votd();
    chapel();
    baldwin();
    radio();
    currentWeather();
    futureWeather();

    //Chapel Owl Carousel
    $(".chapel-carousel").owlCarousel({
        items:      1,
        nav:        false,
        dots:       true
    });

    //Schedule Owl Carousel
    $(".schedule-carousel").owlCarousel({
        items:      1,
        nav:        false,
        dots:       true
    });

    //Baldwin onClick functions / Owl Carousels (very inefficient and needs work)
    $("#baldwin-item-0").click(function() {
        baldwinBreakfast()
    });
    $("#baldwin-item-1").click(function() {
        baldwinLunch()
    });
    $("#baldwin-item-2").click(function() {
        baldwinDinner()
    });


    //Hamburger menu
    $('#header-hamburger-menu').click(function(){
        if($('.bottom-overlay').length){
            hamburgerClose();
        }
        else{
            hamburgerOpen();
        }
    });

    $('a[href^="#"]').click(function(event) {

        var target = $( $(this).attr('href') );

        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }

    });

    /* TODO: close hamburger menu when clicking outside of menu */
    /*$('.bottom-overlay').click(function(){
        $('div.top-overlay').remove();
        $('div.bottom-overlay').remove();
        console.log('run');
    });*/

});