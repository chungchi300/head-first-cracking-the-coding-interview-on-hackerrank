function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done");
    }, ms);
  });
}
function timeoutPromise(ms, promiseThatRestrictedByTimeout) {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("timeout");
    }, ms);
  });
  return Promise.race([promise, promiseThatRestrictedByTimeout]);
}

function a(cb) {
  return cb();
}

timeoutPromise(
  3000,
  a(() => {
    return wait(2000);
  })
)
  .then((res) => {
    console.log({ res });
  })
  .catch((error) => {
    console.log(error);
  });
