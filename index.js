const { Server } = require("socket.io");
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://test.mosquitto.org");
let socketn = null;

const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socketn = socket;

  socket.on("publish", (msg) => {
    console.log(msg);
    client.publish("test222", msg.toString());
  })
})

client.on("connect", function () {
  client.subscribe("test221", function (err) {
    console.log("subscribed to test221");
  });
});

client.on("message", function (topic, message) {
  // message is Buffer
  if (socketn != null) {
    socketn.emit("message", message.toString());
  }
});


