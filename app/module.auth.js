angular.module('app.module.auth', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'view/auth/login.html',
                controller: 'LoginController'
            })
    }])

    .controller('LoginController', ['$scope', '$state', 'LoginService', function ($scope, $state, LoginService) {

        $scope.user = {nickName:'欧阳涛',password:'123'};
        $scope.Login = function () {
            var contacts;
            LoginService.Login($scope.user.nickName, $scope.user.password, function (result) {

                    if (result.status == 200) {
                        $scope.user = result.data;

                        $state.go('home', {user:$scope.user});
                    }
                    else {
                        alert(result.msg);
                    }
                },
                function (error) {
                    alert("登录失败" + JSON.stringify(error));
                    return;
                });
        }
    }])