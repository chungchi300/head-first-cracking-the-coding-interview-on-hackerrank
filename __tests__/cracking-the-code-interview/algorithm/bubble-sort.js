process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = '';
var input_stdin_array = '';
var input_currentline = 0;

process.stdin.on('data', function(data) {
  input_stdin += data;
});

process.stdin.on('end', function() {
  input_stdin_array = input_stdin.split('\n');
  main();
});

function readLine() {
  return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////
function moveBiggestElementToEndBySwap(a, i) {
  let swapOperation = 0;
  /*
    swapping distance is 0 to a.length-1-i because
    1. The last element don't swap,=>-1
    2. Element that already sorted don't need swapping,=>-i
    */
  for (let j = 0; j < a.length - 1 - i; j++) {
    if (a[j] > a[j + 1]) {
      let swap = a[j];

      a[j] = a[j + 1];
      a[j + 1] = swap;

      swapOperation++;
    }
  }
  return swapOperation;
}
function main() {
  var n = parseInt(readLine());
  a = readLine().split(' ');
  a = a.map(Number);
  let swapOperation = 0;
  for (let i = 0; i < a.length - 1; i++) {
    swapOperation += moveBiggestElementToEndBySwap(a, i);
  }
  console.log(`Array is sorted in ${swapOperation} swaps.`);
  console.log(`First Element: ${a[0]}`);
  console.log(`Last Element: ${a[a.length - 1]}`);
}
