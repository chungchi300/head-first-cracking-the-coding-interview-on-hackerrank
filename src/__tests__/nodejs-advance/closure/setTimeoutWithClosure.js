//when loop end, the webapi push the cb when the reference to the i of the function, it copy the value before & has it's own memory space
function alertIAfter1(i) {
  setTimeout(() => {
    console.log(i);
  }, 1);
}
for (var i = 0; i < 3; i++) {
  alertIAfter1(i);
}
