angular.module('app', ['ui.router',
        'ngResource',
        'app.service.chat',
        'app.service.auth',
        'app.service.record',
        'app.module.auth',
        'app.module.chat'

    ])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
    }])

    .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }])

;