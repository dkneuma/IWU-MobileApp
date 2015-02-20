angular.module('iwuApp.services', [])

    .factory('weatherData', function($http){
        var dataToBeReturned = {};

        var todaysWeather = {
            getData: function(){

                return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=4923210&mode=json&units=imperial&cnt=1&APPID=82459d090e8552ff5ef308f72a1a5642')
                    .then(function(response){
                        var jsonObj = response.data;

                        var city = jsonObj.city.name;
                        var tempMin = Math.round(jsonObj.list[0].temp.min);
                        var tempMax = Math.round(jsonObj.list[0].temp.max);

                        return returnTodaysWeather = {
                            'city':city,
                            'tempMin':tempMin,
                            'tempMax':tempMax
                        };
                    })
            }
        };

        var currentWeather = {
            getData: function(){

                return $http.get('http://api.openweathermap.org/data/2.5/weather?id=4923210&units=imperial&mode=json&APPID=82459d090e8552ff5ef308f72a1a5642')
                    .then(function(response){
                        var jsonObj = response.data;

                        var temperature = Math.round(jsonObj.main.temp);
                        var icon = jsonObj.weather[0].icon;
                        var iconCodes = [];
                        iconCodes[0] = '01d';
                        iconCodes[1] = '01n';
                        iconCodes[2] = '02d';
                        iconCodes[3] = '02n';
                        iconCodes[4] = '03d';
                        iconCodes[5] = '03n';
                        iconCodes[6] = '04d';
                        iconCodes[7] = '04n';
                        iconCodes[8] = '09d';
                        iconCodes[9] = '09n';
                        iconCodes[10] = '10d';
                        iconCodes[11] = '10n';
                        iconCodes[12] = '11d';
                        iconCodes[13] = '11n';
                        iconCodes[14] = '13d';
                        iconCodes[15] = '13n';
                        iconCodes[16] = '50d';
                        iconCodes[17] = '50n';

                        var iconCodesPosition = iconCodes.indexOf(icon);

                        var climacons = [];
                        climacons[0] = 'climacon sun';
                        climacons[1] = 'climacon moon waxing crescent';
                        climacons[2] = 'climacon cloud sun';
                        climacons[3] = 'climacon cloud moon';
                        climacons[4] = 'climacon cloud';
                        climacons[5] = 'climacon cloud';
                        climacons[6] = 'climacon cloud';
                        climacons[7] = 'climacon cloud';
                        climacons[8] = 'climacon showers sun';
                        climacons[9] = 'climacon showers moon';
                        climacons[10] = 'climacon downpour sun';
                        climacons[11] = 'climacon downpour moon';
                        climacons[12] = 'climacon lightning sun';
                        climacons[13] = 'climacon lightning moon';
                        climacons[14] = 'climacon snow sun';
                        climacons[15] = 'climacon snow moon';
                        climacons[16] = 'climacon fog';
                        climacons[17] = 'climacon fog';
                        climacons[18] = 'climacon sunglasses';

                        if(iconCodesPosition == -1){
                            icon = climacons[18];
                        }
                        else{
                            icon = climacons[iconCodesPosition];
                        }

                        return returnCurrentWeather = {
                            'temperature':temperature,
                            'icon':icon
                        };
                    })
            }
        };

        var dateWeather = {
            getData: function(){

                var date = new Date();
                var dayMonth = date.getDate();
                var dayWeek = [];
                dayWeek[0] = 'sun';
                dayWeek[1] = 'mon';
                dayWeek[2] = 'tue';
                dayWeek[3] = 'wed';
                dayWeek[4] = 'thu';
                dayWeek[5] = 'fri';
                dayWeek[6] = 'sat';
                var monthYear = [];
                monthYear[0] = 'jan';
                monthYear[1] = 'feb';
                monthYear[2] = 'mar';
                monthYear[3] = 'apr';
                monthYear[4] = 'may';
                monthYear[5] = 'jun';
                monthYear[6] = 'jul';
                monthYear[7] = 'aug';
                monthYear[8] = 'sep';
                monthYear[9] = 'oct';
                monthYear[10] = 'nov';
                monthYear[11] = 'dec';

                return returnDateWeather = {
                    'dayMonth':dayMonth,
                    'dayWeek':dayWeek[date.getDay()],
                    'monthYear':monthYear[date.getMonth()]
                };
            }
        };

        dataToBeReturned.todaysWeather = todaysWeather;
        dataToBeReturned.currentWeather = currentWeather;
        dataToBeReturned.dateWeather = dateWeather;
        return dataToBeReturned;
    })

    .factory('newsData', function($http){
        var dataToBeReturned = {};

        /* TODO: Add sources subcategories */
        var newsJson = {
            getData: function(){

                return $http.get('http://levi.cis.indwes.edu:8080/news')
                    .then(function(response){
                        var jsonObj = response.data;
                        var newsItems = {
                            article:[]
                        };
                        var arrayLength = jsonObj.news.length;

                        for(var i = 0; i < arrayLength; i++){

                            var title = jsonObj.news[i].item;
                            var source = jsonObj.news[i].channel;
                            var link = jsonObj.news[i].guid;
                            var description = jsonObj.news[i].description;
                            var date = jsonObj.news[i].date;
                            var content = jsonObj.news[i].content;

                            newsItems.article[i] = {
                                'title':title,
                                'source':source,
                                'link':link,
                                'description':description,
                                'date':date,
                                'content':content
                            }
                        }

                        return newsItems;
                    })
            }
        };

        dataToBeReturned.newsInfo = newsJson;
        return dataToBeReturned;
    })

    .factory('chapelData', function($http){
        var dataToBeReturned = {};

        var chapelJson = {
            getData: function () {

                return $http.get('http://levi.cis.indwes.edu:8080/chapel')
                    .then(function(response){
                        var jsonObj = response.data;
                        var chapelItems = {
                            chapelSermons:[]
                        };
                        var arrayLength = jsonObj.root.chapel.length;

                        for(var i = 0; i < arrayLength; i++){

                            var date = jsonObj.root.chapel[i].date;
                            var speaker = jsonObj.root.chapel[i].speaker;
                            var description = jsonObj.root.chapel[i].description;

                            chapelItems.chapelSermons[((arrayLength - i) - 1)] = {
                                'date':date,
                                'speaker':speaker,
                                'description':description
                            }
                        }

                        return chapelItems;
                    })
            }
        };

        dataToBeReturned.chapelInfo = chapelJson;
        return dataToBeReturned;
    })

    .factory('votdData', function($http){
        var dataToBeReturned = {};

        /* TODO: Add View in Context option */
        var votdJson = {
            getData: function(){

                return $http.get('http://levi.cis.indwes.edu:8080/votd')
                    .then(function(response){
                        var jsonObj = response.data;

                        var verse = jsonObj.votd.text;
                        var reference = jsonObj.votd.reference;
                        var version = jsonObj.votd.version_id;

                        return returnVotd = {
                            'verse':verse,
                            'reference':reference,
                            'version':version
                        };
                    })
            }
        };

        dataToBeReturned.votdInfo = votdJson;
        return dataToBeReturned;
    });

