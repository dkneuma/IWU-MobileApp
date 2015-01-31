angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope) {
        $scope.menuItems = [
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
        /*$scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbelll', id: 6}
        ];*/

        $scope.navTitle = '<span>IWU</span>';

        /*$http.get('http://levi.cis.indwes.edu:8080/votd')
            .success(function(data){
                var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json(data);

                var title = jsonObj.rss.channel.item.title;
                var verse = jsonObj.rss.channel.item.encoded.__cdata;

                verse = verse.replace(/&ldquo;/,"");
                verse = verse.replace(/\[(.*)\]/,"");
                verse = verse.replace(/&rdquo;(.*)/,"");

                $scope.chapter = title;
                $scope.verse = verse;
            })
            .error(function(){
                console.log('not working');
            });*/
    })

    .controller('VotdCtrl', function ($scope){
        $scope.navTitle = '<span>VOTD</span>';
    })

    .controller('NewsCtrl', function ($scope){
        $scope.navTitle = '<span>News</span>';
    })

    .controller('ChapelCtrl', function ($scope){
        $scope.navTitle = '<span>Chapel</span>';
    })

    .controller('ScheduleCtrl', function ($scope){
        $scope.navTitle = '<span>Schedule</span>';
    })

    .controller('BaldwinCtrl', function ($scope){
        $scope.navTitle = '<span>Baldwin</span>';
    })

    .controller('RadioCtrl', function ($scope){
        $scope.navTitle = '<span>Radio</span>';
    })

    .controller('WeatherCtrl', function ($scope){
        $scope.navTitle = '<span>Weather</span>';
    })

    .controller('SettingsCtrl', function ($scope){
        $scope.navTitle = '<span>Settings</span>';
    });