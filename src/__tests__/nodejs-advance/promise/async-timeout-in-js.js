function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done in mock promise");
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

// Let's race our promises
let timeoutRace = timeoutPromise(100, wait(200));

timeoutRace
  .then((res) => console.log(res))
  .catch((error) => {
    console.log(error); //lost
  }); //

let inTimeRace = timeoutPromise(400, wait(200));

inTimeRace
  .then((res) => console.log(res))
  .catch((error) => {
    console.log(error);
  }); // -> Promise A win!
