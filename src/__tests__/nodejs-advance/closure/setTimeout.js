//when loop end, the webapi push the cb when the reference to the i of the function/global scope
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1);
}
