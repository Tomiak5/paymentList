angular.module("rating", [])
    .directive('poundRating', function () {
        return {
            restrict: "E",
            templateUrl: "components/rating/poundRatingTemplate.html",
            scope: {
                rating: '=ngModel',
                max: '=?'
            },
            link: function (scope, element, attributes) {
                if (scope.max == undefined) {
                    scope.max = 5;
                }
                function updatePounds() {
                    scope.pounds = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.pounds.push({
                            filled: i < scope.rating
                        });
                    }
                }

                scope.$watch('rating', function (oldValue, newValue) {
                    updatePounds();
                });
            }
        }
    });