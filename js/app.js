angular.module("moneyApp", ["ngRoute", "rating", "pagination"])
    .config(function ($routeProvider) {
        $routeProvider.when("/money", {
            templateUrl: "views/money.html"
        });

        $routeProvider.otherwise({
            templateUrl: "/views/money.html"
        });
    });