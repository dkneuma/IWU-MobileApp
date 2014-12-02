/* TODO: Comment Code
 * TODO: Fix onError Functions
 * TODO: Optimize Code */

function news(){

}

function portal() {
    $.ajax({
        type: 'GET',
        url: 'http://192.168.1.106:8080/portal',
        dataType: 'xml',
        success: function (data) {

            var counter = 0;
            $(data).find('item').each(function () {
                var title = $(this).find('title').text();
                if (counter < 3) {
                    $('#news-title-' + counter).append(title);
                }
                else {
                    return false;
                }
                counter++;
            });

        },
        error: function (xhr, type) {
            console.log('Portal Ajax Error');
        }
    });
}
function votd(){
    $.ajax({
        type: 'GET',
        url: 'http://192.168.1.106:8080/votd',
        dataType: 'xml',
        success: function (data) {
            $(data).find('item').each(function () {

                // Get necessary data
                var chapter = $(this).find('title').text();
                var verse = $(this).find('encoded').text();

                // Regex Verse
                verse = verse.replace(/&ldquo;/,"");
                verse = verse.replace(/\[(.*)\]/,"");
                verse = verse.replace(/&rdquo;(.*)/,"");

                // Append data to html
                $('#chapter').append(chapter);
                $('#verse').append(verse);
            });
        },
        error: function (xhr, type) {
            console.log('VOTD Ajax Error');
        }
    });
}
function chapel(){
    $.ajax({
        type: 'GET',
        url: 'http://192.168.1.106:8080/chapel',
        dataType: 'xml',
        success: function (data) {

            var counter = 0;
            $(data).find('chapel').each(function(){
                var date = $(this).find('date').text();
                var speaker = $(this).find('speaker').text();
                var description = $(this).find('description').text();
                if(counter < 3){
                    $('#date-' + counter).append(date);
                    $('#speaker-' + counter).append(speaker);
                    $('#description-' + counter).append(description);
                }
                else{
                    return false;
                }
                counter++;
            });
        },
        error: function (xhr, type) {
            console.log('Chapel Ajax Error');
        }
    });
}
function baldwin(){
    $.ajax({
        type: 'GET',
        url: 'http://192.168.1.106:8080/baldwin',
        dataType: 'xml',
        success: function (data) {

            var counter = 0;
            $(data).find('meal').each(function(){

                var carouselZero = '#baldwin-carousel-0';
                var carouselOne = '#baldwin-carousel-1';
                var carouselTwo = '#baldwin-carousel-2';
                var path;

                if(counter == 0) {
                    path = carouselZero;
                }
                else if(counter == 1) {
                    path = carouselOne;
                }
                else{
                    path = carouselTwo;
                }

                $(this).children('line').each(function(){
                    var name = $(this).children('name').text();

                    $(path).append('<div class="item"></div>');
                    $(path + ' div.item:last-of-type').append('<h4>' + name + '</h4>');
                    $(path + ' div.item:last-of-type').append('<ul></ul>');

                    $(this).children('food').each(function(){
                        var food = $(this).text();

                        $(path + ' div.item:last-of-type ul').append('<li>' + food + '</li>');
                    });
                });

                counter++;

            });
        },
        error: function (xhr, type) {
            console.log('Baldwin Ajax Error');
        }
    });
}
// Current Conditions: http://api.openweathermap.org/data/2.5/weather?id=4923210&units=imperial&mode=xml&APPID=82459d090e8552ff5ef308f72a1a5642
// 5 Day Conditions: http://api.openweathermap.org/data/2.5/forecast/daily?id=4923210&mode=xml&units=imperial&cnt=5&APPID=82459d090e8552ff5ef308f72a1a5642
// Change number of days by changing the 'cnt' attribute, max of 16
// Our developer api id: 82459d090e8552ff5ef308f72a1a5642
function currentWeather(){
    $.ajax({
        type: 'GET',
        url: 'http://192.168.1.106:8080/weather-current',
        dataType: 'xml',
        success: function (data) {
            var temp = $(data).find('temperature').attr('value');
            temp = Math.round(temp);
            /* TODO: Add append method */
        },
        error: function (xhr, type) {
            console.log('Current Weather Ajax Error');
        }
    });
}
function futureWeather(){
    $.ajax({
        type: 'GET',
        url: 'http://192.168.1.106:8080/weather-future',
        dataType: 'xml',
        success: function (data) {
            var counter = 0;

            var date = new Date();
            var today = date.getDay();

            $(data).find('time').each(function(){
                var temp = $(this).children('temperature').attr('max');
                temp = Math.round(temp);

                /* TODO: Add append method (from xml and day-of-week variable) */

                counter++;
            });
        },
        error: function (xhr, type) {
            console.log('Future Weather Ajax Error');
        }
    });
}