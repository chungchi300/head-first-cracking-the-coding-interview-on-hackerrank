var cluster = require("cluster");
var http = require("http");
var port = 3000;

if (cluster.isMaster) {
  var worker1 = cluster.fork();
  var worker2 = cluster.fork();
  worker1.send(port);
  worker1.send(port + 1);
  worker2.send(port + 1);
  worker2.send(port);
  //event loop
} else {
  process.on("message", function(port) {
    console.log("worker %s port %s ", cluster.worker.process.pid, port);
    http
      .createServer((req, res) => {
        res.end("worker");
      })
      .listen(port);
  });
}
