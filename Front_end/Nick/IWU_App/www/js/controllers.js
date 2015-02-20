angular.module('iwuApp.controllers', [])
    .controller('AppCtrl', function ($scope) {

    })

    .controller('LoginCtrl', function ($scope){

    })

    /* Root Level Pages */
    .controller('MainCtrl', function ($scope, weatherData, votdData) {
        // Title
        $scope.navTitle = 'IWU';

        // Weather Data
            /* Overall Weather Data */
        $scope.weather = weatherData;

            /* Todays Weather */
        weatherData.todaysWeather.getData().then(function(asyncSendData){
            $scope.weather.todaysWeather.data = asyncSendData;
        });
        $scope.$watch('weather.todaysWeather.data', function(data){

            if(angular.isDefined(data)){
                console.log('$scope.weather.todaysWeather.data has data');
            }
        });

            /* Current Weather */
        weatherData.currentWeather.getData().then(function(asyncSendData){
            $scope.weather.currentWeather.data = asyncSendData;
        });
        $scope.$watch('weather.currentWeather.data', function(data){

            if(angular.isDefined(data)){
                console.log('$scope.weather.currentWeather.data has data');
            }
        });

            /* Date Weather */
        $scope.weather.dateWeather.data = weatherData.dateWeather.getData();
        $scope.$watch('weather.dateWeather.data', function(data){

            if(angular.isDefined(data)){
                console.log('$scope.weather.dateWeather.data has data');
            }
        });

        // VOTD
        $scope.votd = votdData;

        votdData.votdInfo.getData().then(function(asyncSendData){
            $scope.votd.votdInfo.data = asyncSendData;
        });
        $scope.$watch('votd.votdInfo.data', function(data){

            if(angular.isDefined(data)){
                console.log('$scope.votd.votdInfo.data has data');
            }
        });
    })

    .controller('NewsCtrl', function ($scope){
        // Title
        $scope.navTitle = 'News';

    })

    .controller('ChapelCtrl', function ($scope, chapelData){
        // Title
        $scope.navTitle = 'Chapel';

        // Chapel Data
        $scope.chapel = chapelData;

        chapelData.chapelInfo.getData().then(function(asyncSendData){
            $scope.chapel.chapelInfo.data = asyncSendData;
        });

        $scope.$watch('chapel.chapelInfo.data', function(data){

            if(angular.isDefined(data)){
                console.log('$scope.chapel.chapelInfo.data has data');
            }
        });
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

    /* News Sub-Pages */
    .controller('NewsAthleticsCtrl', function ($scope){
        $scope.navTitle = 'Athletics';
    })

    .controller('NewsLatestCtrl', function ($scope, newsData){
        $scope.navTitle = 'Latest';

        // News Data
        $scope.news = newsData;

        newsData.newsInfo.getData().then(function(asyncSendData){
            $scope.news.newsInfo.data = asyncSendData;
        });

        $scope.$watch('news.newsInfo.data', function(data){

            if(angular.isDefined(data)){
                console.log('$scope.news.newsInfo.data has data');
            }
        });
    })

    .controller('NewsPresidentCtrl', function ($scope){
        $scope.navTitle = 'The President&#39;s Blog';
    })

    .controller('NewsSGACtrl', function ($scope){
        $scope.navTitle = 'SGA Blog';
    })

    .controller('NewsSojournCtrl', function ($scope){
        $scope.navTitle = 'The Sojourn';
    })

    .controller('NewsSpectrumCtrl', function ($scope){
        $scope.navTitle = 'IWU Spectrum';
    });