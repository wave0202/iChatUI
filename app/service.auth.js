angular.module('app.service.auth',['ngResource'])

    .service('LoginService',['$resource',function($resource){

        this.Login = function(nickName,password,success,error){
            var resource = $resource(localhost + 'user/login/:nickName');
            return resource.get({nickName:nickName,password:password},success,error);//异步操作
        }

    }])

;