var app = angular.module("moneyApp");
app.constant("dataUrl", "http://test-api.kuria.tshdev.io")
    .controller("moneyController", function ($scope, $http, dataUrl) {
        $scope.data = {};
        $scope.controls = {
            modalShown: false,
            loading: false
        };

        $scope.controls.modalData = {
            payment_cost_rating: 0
        };
        $scope.paginControls = $scope.paginControls || {};
        $scope.data.filter = {
            query: null,
            page: 0,
            rating: null
        };

        $scope.modalShown = false;
        $scope.toggleModal = function () {
            $scope.modalShown = !$scope.modalShown;
        };

        $scope.toggleModal = function (data) {
            $scope.controls.modalShown = !$scope.modalShown;
            $scope.controls.modalData = data;
        };

        $scope.data.ratings = [
            {value: 1, caption: "1"},
            {value: 2, caption: "2"},
            {value: 3, caption: "3"},
            {value: 4, caption: "4"},
            {value: 5, caption: "5"}
        ];

        $scope.getData = function (resetPage) {
            $scope.data.filter.page = resetPage ? 0 : $scope.data.filter.page;
            $scope.controls.loading = true;
            $http({
                url: dataUrl,
                method: "GET",
                params: $scope.data.filter
            })
                .success(function (data) {
                    $scope.data.payments = data.payments;
                    $scope.data.pagination = data.pagination;
                    $scope.controls.loading = false;
                })
                .error(function (error) {
                    $scope.data.error = error;
                    $scope.controls.loading = false;
                });
        };

        $scope.resetData = function () {
            $scope.data.filter = {
                query: null,
                page: 0,
                rating: null
            };
            $scope.getData();
        };

        $scope.getData();

    });