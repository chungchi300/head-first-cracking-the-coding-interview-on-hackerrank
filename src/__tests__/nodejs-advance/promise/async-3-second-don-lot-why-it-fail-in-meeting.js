function wait(second) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, second * 1000);
  });
}

function a(cb) {
  return new Promise((resolve, reject) => {
    cb().then(() => {
      clearTimeout(timeOutId);
      resolve();
    });
    let timeOutId = setTimeout(() => {
      reject();
    }, 1000 * 3);
  });
}

a(() => {
  console.log("wait for 2 second");
  return wait(2);
})
  .then(() => {
    console.log("done as expected");
  })
  .catch(() => {
    console.log("error");
  });

a(() => {
  console.log("wait for 2 second");
  return wait(5);
})
  .then(() => {
    console.log("done");
  })
  .catch(() => {
    console.log("error as expected");
  });
