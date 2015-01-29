angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope) {

    })

    .controller('MainCtrl', function ($scope) {
        /*$scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbelll', id: 6}
        ];*/

        $scope.navTitle = '<img src="img/head_two.png" />' +
        '<span>IWU</span>';
    })

    .controller('NewsCtrl', function ($scope){
        $scope.navTitle = '<img src="img/head_two.png" />' +
        '<span>News</span>';
    })

    .controller('ChapelCtrl', function ($scope){
        $scope.navTitle = '<img src="img/head_two.png" />' +
        '<span>Chapel</span>';
    })

    .controller('ScheduleCtrl', function ($scope){
        $scope.navTitle = '<img src="img/head_two.png" />' +
        '<span>Schedule</span>';
    })

    .controller('BaldwinCtrl', function ($scope){
        $scope.navTitle = '<img src="img/head_two.png" />' +
        '<span>Baldwin</span>';
    })

    .controller('RadioCtrl', function ($scope){
        $scope.navTitle = '<img src="img/head_two.png" />' +
        '<span>Radio</span>';
    })

    .controller('WeatherCtrl', function ($scope){
        $scope.navTitle = '<img src="img/head_two.png" />' +
        '<span>Weather</span>';
    })

    .controller('SettingsCtrl', function ($scope){
        $scope.navTitle = '<img src="img/head_two.png" />' +
        '<span>Settings</span>';
    });