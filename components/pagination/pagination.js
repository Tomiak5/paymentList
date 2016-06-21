angular.module("pagination", [])
    .directive('paginationBar', function () {
        return {
            restrict: "E",
            templateUrl: "components/pagination/paginationTemplate.html",
            scope: {
                current: '=ngModel',
                total: '=',
                left: '=',
                right: '=',
                onPageSelect: '&'
            },
            link: function (scope, element, attributes) {
                scope.current = 0;
                scope.pages = [];
                scope.from = 0;
                scope.size = 4;

                function update() {
                    scope.pages = [];
                    var length = scope.size > scope.total ? scope.from + scope.total : scope.from + scope.size;
                    for (var i = scope.from; i < length; i++) {
                        scope.pages.push({index: i});
                    }
                }

                scope.nextPage = function () {
                    if (scope.current + 1 <= scope.size + scope.from && scope.current + 1 < scope.total) {
                        if (scope.from + 1 <= scope.total - scope.size)
                            scope.from++;
                        scope.current++;
                        update();
                    }
                };

                scope.prevPage = function () {
                    if (scope.current - 1 <= scope.size + scope.from && scope.current - 1 >= 0) {
                        if (scope.from - 1 >= 0)
                            scope.from--;
                        scope.current--;
                        update();
                    }

                };

                scope.isDisabled = function (direction) {
                    var p = scope.pagination;
                    if (p)
                        return !p[direction];
                };

                scope.getCurrentPageClass = function (page) {
                    if (scope.current == page)
                        return 'active'
                };

                scope.getClass = function (direction) {
                    return scope[direction] ? 'enabled' : "disabled";
                };

                scope.$watch('total', function (newValue, oldValue) {
                    update();
                });

                scope.$watch('current', function (newValue, oldValue) {
                    scope.onPageSelect();
                    update();
                });

                scope.changePage = function (newPage) {
                    scope.current = newPage;
                    if (scope.from > newPage)
                        scope.from = newPage;
                    update();
                }
            }
        }
    });