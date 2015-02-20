// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('iwuApp',
    ['ionic',
    'iwuApp.services',
    'iwuApp.controllers'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            /* Global App */
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            /* Login */
            .state('app.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login.html",
                        controller: 'LoginCtrl'
                    }
                }
            })

            /* Root Level Pages */
            .state('app.main', {
                url: "/main",
                views: {
                    'menuContent': {
                        templateUrl: "templates/main.html",
                        controller: 'MainCtrl'
                    }
                }
            })
            .state('app.news', {
                url: "/news",
                views: {
                    'menuContent': {
                        templateUrl: "templates/news.html",
                        controller: 'NewsCtrl'
                    }
                }
            })
            .state('app.chapel', {
                url: "/chapel",
                views: {
                    'menuContent': {
                        templateUrl: "templates/chapel.html",
                        controller: 'ChapelCtrl'
                    }
                }
            })
            .state('app.schedule', {
                url: "/schedule",
                views: {
                    'menuContent': {
                        templateUrl: "templates/schedule.html",
                        controller: 'ScheduleCtrl'
                    }
                }
            })
            .state('app.baldwin', {
                url: "/baldwin",
                views: {
                    'menuContent': {
                        templateUrl: "templates/baldwin.html",
                        controller: 'BaldwinCtrl'
                    }
                }
            })
            .state('app.settings', {
                url: "/settings",
                views: {
                    'menuContent': {
                        templateUrl: "templates/settings.html",
                        controller: 'SettingsCtrl'
                    }
                }
            })

            /* News Sub-Pages */
            .state('app.news-athletics', {
                url: "/news/athletics",
                views: {
                    'menuContent': {
                        templateUrl: "templates/news/athletics.html",
                        controller: 'NewsAthleticsCtrl'
                    }
                }
            })
            .state('app.news-latest', {
                url: "/news/latest",
                views: {
                    'menuContent': {
                        templateUrl: "templates/news/latest.html",
                        controller: 'NewsLatestCtrl'
                    }
                }
            })
            .state('app.news-president', {
                url: "/news/president",
                views: {
                    'menuContent': {
                        templateUrl: "templates/news/president.html",
                        controller: 'NewsPresidentCtrl'
                    }
                }
            })
            .state('app.news-sga', {
                url: "/news/sga",
                views: {
                    'menuContent': {
                        templateUrl: "templates/news/sga.html",
                        controller: 'NewsSGACtrl'
                    }
                }
            })
            .state('app.news-sojourn', {
                url: "/news/sojourn",
                views: {
                    'menuContent': {
                        templateUrl: "templates/news/sojourn.html",
                        controller: 'NewsSojournCtrl'
                    }
                }
            })
            .state('app.news-spectrum', {
                url: "/news/spectrum",
                views: {
                    'menuContent': {
                        templateUrl: "templates/news/spectrum.html",
                        controller: 'NewsSpectrumCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/main');
    });
