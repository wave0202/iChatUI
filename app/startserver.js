var mosca = require('mosca');
var MqttServer = new mosca.Server({

    http:{
        port:3000,
        bundle:true,
        static:'./'
    }
});

MqttServer.on('clientConnected', function(client){
    console.log('client connected', client.id);
});

/**
 * 监听MQTT主题消息
 **/
MqttServer.on('published', function(packet, client) {
    var topic = packet.topic;
    console.log('message-arrived--->','topic ='+topic+',message = '+ packet.payload.toString());

});

MqttServer.on('ready', function(){
    console.log('mqtt is running...');
});
