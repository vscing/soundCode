function func() {
  let a = 1;
  console.log('外', a);
  return function(c = 0) {
    if(c) {
      a = c;
    }
    console.log('内', a);
  }
}

let b1 = func();
b1(3);
b1(4);
b1(0);

console.log(1+null) // 1
console.log(1+undefined)  // NaN
console.log(1+false) // 1
console.log(1+{}) // 1 [object object]
console.log(1+[]) // 1