var app = angular.module('wscene', [
    'ui.router',
    'ngTouch',
    'ngAnimate',
    'wscene.controllers',
    //'http-auth-interceptor',
    'ngActivityIndicator',
    'Services'
]);


app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $urlRouterProvider.when("", "/home");

        $stateProvider

            .state("home", {
                url: "/home",
                templateUrl: "templates/home.html",
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

    }])

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
