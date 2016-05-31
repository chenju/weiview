var app = angular.module('wscene', [
    'ui.router',
    'ngTouch',
    'ngAnimate',
    'wscene.controllers',
    //'http-auth-interceptor',
    'ngActivityIndicator',
    //'Services'
]);


app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $urlRouterProvider.when("", "/home");

        $stateProvider

            .state("home", {
                url: "/home",
                templateUrl: "templates/index.html",
                controller: 'HomeController',
                resolve: {
                    data: ['$q', function($q) {
                        var defer = $q.defer();
                        setTimeout(function() {
                            defer.resolve('HomeController');
                        }, 100);
                        return defer.promise;
                    }]
                }

            })
            .state("play", {
                url: "/play",
                templateUrl: "templates/play.html",
                controller: 'PlayController',
                resolve: {
                    data: ['$q', function($q) {
                        var defer = $q.defer();
                        setTimeout(function() {
                            defer.resolve('PlayController');
                        }, 100);
                        return defer.promise;
                    }]
                }

            })
            .state("over", {
                url: "/over",
                templateUrl: "templates/over.html",
                controller: 'OverController',
                resolve: {
                    data: ['$q', function($q) {
                        var defer = $q.defer();
                        setTimeout(function() {
                            defer.resolve('OverController');
                        }, 100);
                        return defer.promise;
                    }]
                }

            })

    }])
    /*

controller('AppController', [
        '$rootScope',
        'UserService',

        function($rootScope, UserService) {
            $rootScope.userService = UserService;

            $rootScope.broadcastBtnEvent = function(event) {
                $rootScope.$broadcast(event);
            };
        }
    ])*/


/*
angular.module('demo').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        'use strict';

        $routeProvider.when('/', {
            controller:  'HomeController',
            templateUrl: 'templates/index.html',
            resolve: {
                    data: ['$q', function($q){
                        var defer = $q.defer();
                        setTimeout(function(){
                            defer.resolve('HomeController');
                        }, 100);
                        return defer.promise;
                    }]
                }
        })
        .when('/test', {
            controller:  'HomeController',
            templateUrl: 'templates/test.html',
            resolve: {
                    data: ['$q', function($q){
                        var defer = $q.defer();
                        setTimeout(function(){
                            defer.resolve('HomeController');
                        }, 100);
                        return defer.promise;
                    }]
                }
        })
        .when('/play', {
            controller:  'PlayController',
            templateUrl: 'templates/play.html',
            resolve: {
                    data: ['$q', function($q){
                        var defer = $q.defer();
                        setTimeout(function(){
                            defer.resolve('HomeController');
                        }, 1500);
                        return defer.promise;
                    }]
                }
        })
        .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true);

    }
]);
*/

angular.module('wscene').controller('DemoCtrl', function($scope, $location) {

    $scope.addAlert = function() {
        $location.path('/more');
    }
})


angular.module('wscene').animation('.test', ['$animateCss', function($animateCss) {
    return {
        enter: function(element, doneFn) {
            var height = element[0].offsetHeight;
            return $animateCss(element, {
                from: {
                    height: '0px'
                },
                to: {
                    height: height + 'px'
                },
                duration: 1 // one second
            });
        }
    }
}]);
