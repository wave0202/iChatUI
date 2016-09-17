angular.module('app.service.record',[])

    .service('RecordService',[function(){
        var map = new HashMap();

        this.addRecord = function(contactName,nickName,createTime,fromType,record,userAvatar){
            if(map.containsKey(contactName)){
                map.get(contactName).push({
                    nickName:nickName,
                    createTime: createTime,
                    fromType: fromType,
                    record: record,
                    userAvatar: userAvatar
                });
            }else {
                var messages = [];
                messages.push({
                    nickName:nickName,
                    createTime: createTime,
                    fromType: fromType,
                    record: record,
                    userAvatar: userAvatar
                });
                map.put(contactName,messages);
                console.log(contactName +"中插入消息："+messages);
            }

        };

        this.getRecord = function(contactName){
            return map.get(contactName);
        };

        /*this.clearRecord = function(){
            return messages = [];
        }*/
    }])

;