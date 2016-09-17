angular.module('app.module.chat', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            abstract: false,
            url: '/user',
            views: {
                '': {
                    templateUrl: 'view/home.html',
                    controller: 'MainController'
                }
            },
            params: {
                user: null
            }
        }).state('home.first', {
            url: '/chat/:topic',
            templateUrl: 'view/content/content.html',
            controller: 'ChatController'
        })

    }])

    .controller('MainController', ['$scope', '$state', '$stateParams', 'ChatService', 'RecordService',
        function ($scope, $state, $stateParams, ChatService, RecordService) {
            //用户信息
            $scope.user = $stateParams.user;
            //联系人信息
            ChatService.getAllContacts($stateParams.user.userId).$promise.then(function (result) {
                $scope.contacts = result.data;
            }, function (error) {

            });

            //连接服务器
            $scope.client = ChatService.connectServer($scope.user.nickName);


            $scope.messageSize = {};
            //$scope.messageSize = new Array();
            //选择联系人
            $scope.selectContact = function (contactName) {
                $scope.selected = contactName;
                $scope.messageSize[contactName] = "";
                $scope.messages = RecordService.getRecord(contactName);
                console.log($scope.messages);
            };


            var on_message = function (topic, payload) {
                $scope.$apply(function () {
                    var message = payload.toString().split("~&");
                    RecordService.addRecord(message[0], message[0], message[1], "other", message[2], message[3]);

                    if ($scope.selected != message[0]) {
                        $scope.countUnreadMessage(message[0]);
                    }

                    console.log("未读消息数：" + $scope.messageSize[message[0]]);
                });
            };

            $scope.countUnreadMessage = function (name) {
                if (null == $scope.messageSize[name] || $scope.messageSize[name] == "") {
                    $scope.messageSize[name] = 1;
                } else {
                    ++$scope.messageSize[name];
                }
            };

            //收到的消息是一个Buffer
            $scope.client.on("message", on_message);

        }])

    .controller('ChatController', ['$scope', '$state', '$stateParams', '$filter', 'RecordService',
        function ($scope, $state, $stateParams, $filter, RecordService) {
            $scope.topic = $stateParams.topic;
            console.log("当前联系人：" + $scope.topic);
            //console.log($scope.messages);

            //发信息
            $scope.sendMessage = function () {
                var currentDate = $filter('date')(new Date(), 'yyyy/M/d H:m:s');

                RecordService.addRecord($scope.topic, $scope.user.nickName, currentDate, "self", $scope.msg, $scope.user.userAvatar);
                $scope.client.publish($scope.topic, $scope.user.nickName + '~&' + currentDate
                    + '~&' + $scope.msg + '~&' + $scope.user.userAvatar);

                $scope.messages = RecordService.getRecord($scope.topic);
            };

            //Enter键发送，Ctrl+Enter换行
            $scope.down = 0;//设置全局变量down，用来记录ctrl是否被按下；
            $scope.enter = function (event) {

                if (event.which === 17) {
                    $scope.down = 1;      //ctrl按下
                }
                if (event.which === 13) {
                    console.log("down=" + $scope.down);
                    if ($scope.down == 1) {
                        console.log("按下Ctrl+Enter");
                        $scope.msg = $scope.msg + '\n';
                        $scope.down = 0;     //换行后记得将全局变量置为1，否则enter将变成换行，失去发送功能
                        console.log($scope.msg);
                    } else {
                        console.log("只按下Enter");
                        $scope.sendMessage();

                        /*$scope.msg.replace(/^\n+|\n+$/g,"");*/
                        //$scope.msg.replace(/[\r\n]/g, "");
                        $scope.msg.replace(/\n$/,'');

                        $scope.msg = "";
                        $scope.msg.replace(/.*/,'\r');

                    }
                }
            }
        }])

;