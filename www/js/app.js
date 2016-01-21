// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('hommy', ['ionic', 'hommy.controllers','hommy.directives','google.places','hommy.sevices'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.keyboard) {
                cordova.plugins.keyboard.hidekeyboardaccessorybar(true);
                cordova.plugins.keyboard.disablescroll(true);
            }
            if (window.statusbar) {
                //org.apache.cordova.statusbar required
                //window.statusbar.styledefault();
            }
        });
        Parse.initialize('Dnl1Iu3gglKtcpgo7XRz85xDYbQlwBZRGMMGKRkk','wjcegoEo3d4bswdkCAhyaeT67Hhbac1Ri0SQHfgh');
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.kitchens', {
                url: '/kitchens/:location',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/kitchens.html',
                        controller: 'getChefs'
                    }
                }
            })

            .state('app.orderhistory', {
                url: '/orderhistory',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/orderhistory.html'
                    }
                }
            })

            .state('app.favourite', {
                url: '/favourite',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/favourite.html'
                    }
                }
            })

            .state('app.kitchen', {
                url: '/kitchen/:chefId/:name',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/kitchen.html',
                        controller: 'getDishes'
                    }
                }
            })

            .state('app.location', {
                url: '/location',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/location.html',
                        controller: 'getLocation'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/kitchens/mylocation');
    });