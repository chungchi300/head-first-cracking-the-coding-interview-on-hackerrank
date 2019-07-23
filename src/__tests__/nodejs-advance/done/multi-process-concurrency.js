var cluster = require("cluster");
const numCPUs = require("os").cpus().length;

//concurrency using the icp communication and creation new process
//different from traditional event loop concurrency model,
// they really use different memory
if (cluster.isMaster) {
  // 衍生工作进程。
  for (let i = 0; i < numCPUs; i++) {
    worker = cluster.fork();

    worker.on("message", function(msg) {
      console.log("Master:", msg);
    });
  }
} else {
  console.log("Worker:", "worker starting");
  i = 0;
  //really is different memory from event loop
  let max = Math.random() * 1000000;
  for (; i < max; i++) {}
  process.send(`worker worked ${i}`);
  process.exit();
}
