angular.module('iwuApp.controllers', [])
    .controller('AppCtrl', function ($scope) {

    })
    .controller('LoginCtrl', function ($scope){

    })

    /* Root Level Pages */
    .controller('MainCtrl', function ($scope, shareData) {
        // Title
        $scope.navTitle = 'IWU';

        // VOTD
        $scope.data = shareData;
        $scope.$watch('data.votd.data', function(data){
            if(angular.isDefined(data)){
                $scope.votd = shareData.votd.data;
                console.log('$scope.data.votd.data has data');
            }
        });

        // Weather
        $scope.$watch('data.weather.todaysWeather', function(data){
            if(angular.isDefined(data)){
                $scope.todaysWeather = shareData.weather.todaysWeather;
                console.log('$scope.data.weather.todaysWeather has data');
            }
        });
        $scope.$watch('data.weather.currentWeather', function(data){
            if(angular.isDefined(data)){
                $scope.currentWeather = shareData.weather.currentWeather;
                console.log('$scope.data.weather.currentWeather has data');
            }
        });
        $scope.$watch('data.weather.dateWeather', function(data){
            if(angular.isDefined(data)){
                $scope.dateWeather = shareData.weather.dateWeather;
                console.log('$scope.data.weather.dateWeather has data');
            }
        });
    })
    .controller('NewsCtrl', function ($scope){
        // Title
        $scope.navTitle = 'News';

    })
    .controller('ChapelCtrl', function ($scope, shareData){
        // Title
        $scope.navTitle = 'Chapel';

        // Chapel Data
        $scope.data = shareData;
        $scope.$watch('data.chapel.data', function(data){
            if(angular.isDefined(data)){
                $scope.chapel = shareData.chapel.data;
                console.log('$scope.data.chapel.data has data');
            }
        });
    })
    .controller('ScheduleCtrl', function ($scope){
        $scope.navTitle = 'Schedule';
    })
    .controller('FoodCtrl', function ($scope){
        $scope.navTitle = 'Food Services';
    })
    .controller('SettingsCtrl', function ($scope){
        $scope.navTitle = 'Settings';
    })

    /* News Sub-Pages */
    .controller('NewsAthleticsCtrl', function ($scope, shareData){
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
        $scope.data = shareData;
        $scope.$watch('data.news.data', function(data){
            if(angular.isDefined(data)){
                $scope.news = shareData.news.data;
                console.log($scope.news = shareData.news.data);
                console.log('$scope.news.newsInfo.data has data');
            }
        });
    })
    .controller('NewsLatestCtrl', function ($scope, shareData){
        // Title
        $scope.navTitle = 'Latest';

        // News Limiter
        var quantityLimit = 10;
        $scope.quantity = quantityLimit;
        $scope.incrementLimit = function() {
            $scope.quantity += quantityLimit;
        };

        // News Data
        $scope.data = shareData;
        $scope.$watch('data.news.data', function(data){
            if(angular.isDefined(data)){
                $scope.news = shareData.news.data;
                console.log($scope.news = shareData.news.data);
                console.log('$scope.news.newsInfo.data has data');
            }
        });
    })
    .controller('NewsPresidentCtrl', function ($scope, shareData){
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
        $scope.data = shareData;
        $scope.$watch('data.news.data', function(data){
            if(angular.isDefined(data)){
                $scope.news = shareData.news.data;
                console.log($scope.news = shareData.news.data);
                console.log('$scope.news.newsInfo.data has data');
            }
        });
    })
    .controller('NewsSGACtrl', function ($scope, shareData){
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
        $scope.data = shareData;
        $scope.$watch('data.news.data', function(data){
            if(angular.isDefined(data)){
                $scope.news = shareData.news.data;
                console.log($scope.news = shareData.news.data);
                console.log('$scope.news.newsInfo.data has data');
            }
        });
    })
    .controller('NewsSojournCtrl', function ($scope, shareData){
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
        $scope.data = shareData;
        $scope.$watch('data.news.data', function(data){
            if(angular.isDefined(data)){
                $scope.news = shareData.news.data;
                console.log($scope.news = shareData.news.data);
                console.log('$scope.news.newsInfo.data has data');
            }
        });
    })
    .controller('NewsSpectrumCtrl', function ($scope, shareData){
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
        $scope.data = shareData;
        $scope.$watch('data.news.data', function(data){
            if(angular.isDefined(data)){
                $scope.news = shareData.news.data;
                console.log($scope.news = shareData.news.data);
                console.log('$scope.news.newsInfo.data has data');
            }
        });
    })

    /* Food Sub-Pages */
    .controller('FoodBaldwinCtrl', function ($scope){
        $scope.navTitle = 'Baldwin';
    })
    .controller('FoodMariosCtrl', function ($scope){
        $scope.navTitle = 'Mario&#39;s';
    })
    .controller('FoodWildcatCtrl', function ($scope){
        $scope.navTitle = 'Wildcat Express & Chick-fil-A';
    })
    .controller('FoodCollegeStoreCtrl', function ($scope){
        $scope.navTitle = 'C-Store';
    });