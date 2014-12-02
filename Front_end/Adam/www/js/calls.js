/*
    Function Calls
 */

$(document).ready(function() {

    // Ajax
    portal();
    votd();
    chapel();
    baldwin();
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
        $(".card-baldwin-item").toggleClass("baldwin-disable");
        $(this).removeClass("baldwin-disable").toggleClass("baldwin-active").promise().done(function(){
            $("#baldwin-carousel-0").owlCarousel({
                items:      2,
                nav:        false,
                dots:       true
            });
        });
    });

    $("#baldwin-item-1").click(function() {
        $(".card-baldwin-item").toggleClass("baldwin-disable");
        $(this).removeClass("baldwin-disable").toggleClass("baldwin-active").promise().done(function(){
            $("#baldwin-carousel-1").owlCarousel({
                items:      2,
                nav:        false,
                dots:       true
            });
        });
    });

    $("#baldwin-item-2").click(function() {
        $(".card-baldwin-item").toggleClass("baldwin-disable");
        $(this).removeClass("baldwin-disable").toggleClass("baldwin-active").promise().done(function(){
            $("#baldwin-carousel-2").owlCarousel({
                items:      2,
                nav:        false,
                dots:       true
            });
        });
    });
});