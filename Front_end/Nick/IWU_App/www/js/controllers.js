angular.module('iwuApp.controllers', [])

    .controller('AppCtrl', function ($scope) {
        $scope.menuItems = [
            {title: 'Dashboard', url: '#/app/main'},
            {title: 'Verse of the Day', url: '#/app/votd'},
            {title: 'Campus News', url: '#/app/news'},
            {title: 'Chapel', url: '#/app/chapel'},
            {title: 'Class Schedule', url: '#/app/schedule'},
            {title: 'Baldwin Menu', url: '#/app/baldwin'},
            {title: 'The Fortress', url: '#/app/radio'},
            {title: 'Campus Weather', url: '#/app/weather'},
            {title: 'Settings', url: '#/app/settings'}
        ];
    })

    .controller('LoginCtrl', function ($scope){

    })

    .controller('MainCtrl', function ($scope, $http) {
        $scope.navTitle = '<span>IWU</span>';

        $http.get('http://api.openweathermap.org/data/2.5/weather?id=4923210&units=imperial&mode=json&APPID=82459d090e8552ff5ef308f72a1a5642')
            .success(function(data){
                /*var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json(data);*/
                var jsonObj = data;

                var city = jsonObj.name;
                var temp = jsonObj.main.temp;
                var tempMin = jsonObj.main.temp_min;
                var tempMax = jsonObj.main.temp_max;
                var icon = jsonObj.weather.icon;

                // Weather Condition Codes: http://openweathermap.org/weather-conditions
                if(icon == '01d'){
                    // Clear Day
                }
                else if(icon == '01n'){
                    // Clear Night
                }
                else if(icon == '02d'){
                    // Few Clouds Day
                }
                else if(icon == '02n'){
                    // Few Clouds Night
                }
                else if(icon == '03d'){
                    // Scattered Clouds Day
                }
                else if(icon == '03n'){
                    // Scattered Clouds Night
                }
                else if(icon == '04d'){
                    // Broken Clouds Day
                }
                else if(icon == '04n'){
                    // Broken Clouds Night
                }
                else if(icon == '09d'){
                    // Shower Rain Day/Night
                }
                else if(icon == '09n'){
                    // Shower Rain Day/Night
                }
                else if(icon == '10d'){
                    // Rain Day
                }
                else if(icon == '10n'){
                    // Rain Night
                }
                else if(icon == '11d'){
                    // Thunderstorm Day/Night
                }
                else if(icon == '11n'){
                    // Thunderstorm Day/Night
                }
                else if(icon == '13d'){
                    // Snow Day/Night
                }
                else if(icon == '13n'){
                    // Snow Day/Night
                }
                else if(icon == '50d'){
                    // Mist Day/Night
                }
                else if(icon == '50n'){
                    // Mist Day/Night
                }
                else{
                    // Clear Day (default value)
                }

                $scope.city = city;
                $scope.temp = temp;
                $scope.tempMin = tempMin;
                $scope.tempMax = tempMax;
                $scope.icon = icon;
            })
            .error(function(){
                console.log('not working');
            });

    })

    .controller('VotdCtrl', function ($scope){
        $scope.navTitle = 'VOTD';
    })

    .controller('NewsCtrl', function ($scope){
        $scope.navTitle = 'News';
    })

    .controller('ChapelCtrl', function ($scope){
        $scope.navTitle = 'Chapel';
    })

    .controller('ScheduleCtrl', function ($scope){
        $scope.navTitle = 'Schedule';
    })

    .controller('BaldwinCtrl', function ($scope){
        $scope.navTitle = 'Baldwin';
    })

    .controller('SettingsCtrl', function ($scope){
        $scope.navTitle = 'Settings';
    })

    .controller('AthleticsCtrl', function ($scope){
        $scope.navTitle = 'Athletics';
    })

    .controller('LatestCtrl', function ($scope){
        $scope.navTitle = 'Latest';
    })

    .controller('PresidentCtrl', function ($scope){
        $scope.navTitle = 'The President&#39;s Blog';
    })

    .controller('SGACtrl', function ($scope){
        $scope.navTitle = 'SGA Blog';
    })

    .controller('SojournCtrl', function ($scope){
        $scope.navTitle = 'The Sojourn';
    })

    .controller('SpectrumCtrl', function ($scope){
        $scope.navTitle = 'IWU Spectrum';
    });