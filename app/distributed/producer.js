const kafka = require('kafka-node');
const HighLevelProducer = kafka.HighLevelProducer;
const client = new kafka.Client('localhost:2181', 'consumer');
const producer = new HighLevelProducer(client);
var i = 0;

producer.on('ready', () => {
  setInterval(() => {
    producer.send([{ topic: 'app', messages: i }], function (err, data) { });
    i++;
  }, 1000);
});
