angular.module('app.service.chat',['ngResource'])

    .service('ChatService',['$resource',function($resource){

        var client;

        this.connectServer = function(topic){
            client = mqtt.connect('mqtt://127.0.0.1:3000');
            //订阅,主题为当前用户id
            client.subscribe(topic);
            console.log("订阅成功，主题：" + topic);

            return client;
        };

        this.getAllContacts = function(userId){
            var resource = $resource(localhost + 'friend/:userId');//开启一个线程获取后台资源，属于异步操作
            return resource.get({userId:userId});
        }

        /*this.getContactById = function(userId){
            var resource = $resource(localhost + 'user/:userId');
            return resource.get({userId:userId});
        }*/


    }])