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

    .controller('FoodCtrl', function ($scope){
        $scope.navTitle = 'Food Service';
    })

    .controller('SettingsCtrl', function ($scope){
        $scope.navTitle = 'Settings';
    })

    /* News Sub-Pages */
    .controller('NewsAthleticsCtrl', function ($scope, newsData){
        // Title
        $scope.navTitle = 'Athletics';

        // News Limiter
        var quantityLimit = 10;
        $scope.quantity = quantityLimit;
        $scope.incrementLimit = function() {
            $scope.quantity += quantityLimit;
        };

        // News Filter
        $scope.filterFunction = function(element) {
            if(element.source == 'Indiana Wesleyan University Athletic Department - News'){
                return true;
            }
            else{
                return false;
            }
        };

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

    .controller('NewsLatestCtrl', function ($scope, newsData){
        // Title
        $scope.navTitle = 'Latest';

        // News Limiter
        var quantityLimit = 10;
        $scope.quantity = quantityLimit;
        $scope.incrementLimit = function() {
            $scope.quantity += quantityLimit;
        };

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

    .controller('NewsPresidentCtrl', function ($scope, newsData){
        // Title
        $scope.navTitle = 'The President&#39;s Blog';

        // News Limiter
        var quantityLimit = 10;
        $scope.quantity = quantityLimit;
        $scope.incrementLimit = function() {
            $scope.quantity += quantityLimit;
        };

        // News Filter
        $scope.filterFunction = function(element) {
            if(element.source == 'IWU President'){
                return true;
            }
            else{
                return false;
            }
        };

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

    .controller('NewsSGACtrl', function ($scope, newsData){
        // Title
        $scope.navTitle = 'The SGA Blog';

        // News Limiter
        var quantityLimit = 10;
        $scope.quantity = quantityLimit;
        $scope.incrementLimit = function() {
            $scope.quantity += quantityLimit;
        };

        // News Filter
        $scope.filterFunction = function(element) {
            if(element.source == 'SGA'){
                return true;
            }
            else{
                return false;
            }
        };

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

    .controller('NewsSojournCtrl', function ($scope, newsData){
        // Title
        $scope.navTitle = 'The Sojourn';

        // News Limiter
        var quantityLimit = 10;
        $scope.quantity = quantityLimit;
        $scope.incrementLimit = function() {
            $scope.quantity += quantityLimit;
        };

        // News Filter
        $scope.filterFunction = function(element) {
            if(element.source == 'The Sojourn'){
                return true;
            }
            else{
                return false;
            }
        };

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

    .controller('NewsSpectrumCtrl', function ($scope, newsData){
        // Title
        $scope.navTitle = 'IWU Spectrum';

        // News Limiter
        var quantityLimit = 10;
        $scope.quantity = quantityLimit;
        $scope.incrementLimit = function() {
            $scope.quantity += quantityLimit;
        };

        // News Filter
        $scope.filterFunction = function(element) {
            if(element.source == 'IWU Spectrum'){
                return true;
            }
            else{
                return false;
            }
        };

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
    });