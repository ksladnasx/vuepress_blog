let a = Array.of(8.0); // [8]
console.log(a); 
let b = Array(8.0); // [empty x 8]
console.log(b); 
// 如果传入单个数字参数，Array() 会将其解释为数组长度，而 Array.of() 则会将其作为数组的单个元素。
let c = Array.of(8.1); // [8.1]
console.log(c); 
const d = {0: 'a', 1: 'b', 2:'c', length: 3};
console.log(Array.from(d)); // ['a', 'b', 'c', undefined]
Array.from(d, function(value, index){
  console.log(value, index, this, arguments.length);//每次迭代都会调用
  return value.repeat(3);   //必须指定返回值，否则返回 undefined
}, d);
