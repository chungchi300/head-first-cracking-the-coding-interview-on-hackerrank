//when loop end, the webapi push the cb when the reference to the i of the function/global scope
for (let i = 0; i < 3; i++) {
  //block scope, each time is a new variable for closure
  setTimeout(() => {
    console.log(i);
  }, 1);
}
