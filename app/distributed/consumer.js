const kafka = require('kafka-node');
const Consumer = kafka.HighLevelConsumer;
const client = new kafka.Client('localhost:2181','consumer-' + process.pid);
const consumer = new Consumer(client, [{ topic: 'app', groupId: 'my-group' }]);

consumer.on('message', function (message) {
  console.log(message.value.toString());
});

process.on('SIGINT', function () {
    consumer.close(true, function () {
        process.exit();
    });
});