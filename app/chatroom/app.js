const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.Client();
const Producer = kafka.Producer;
const producer = new Producer(client);
const consumer = new Consumer(client, []);

var cb = function (error, data) { return null; };
var isProducerReady = false;
var exitRequested = false;
var chatName = '';

consumer.on('message', function (message) { 
  const innerMessage = JSON.parse(message.value);
  if (innerMessage.from !== chatName) {
    console.log('\n' + innerMessage.from + ': ' + innerMessage.text); 
  }
});
producer.on('ready', function () { 
    producer.createTopics(['chat'], cb)
    isProducerReady = true; 
});

rl.question('What is your name?\n', (name) => {
  chatName = name || '';
  producer.createTopics(['chat'], cb)
  consumer.addTopics(['chat']);
  readUserInput(chatName);
});

var readUserInput = function (chatName) {
  rl.question(chatName + ': ', (command) => {
    switch (command) {
      case 'exit':
        console.log('Exiting application, goodbye...');
        consumer.removeTopics(['chat'], cb);
        consumer.close(cb);
        exitRequested = true;
        break;
      default: 
        sendMessage(JSON.stringify({text: command, from: chatName}));
        break;
    }
    return exitRequested 
      ? rl.close()
      : readUserInput(chatName);
  });
}

var sendMessage = function (message) {
  if (isProducerReady) {
    producer.send([{ topic: 'chat', messages: message }], cb);
  } else {
    console.log('Cannot send message...');
  }
}