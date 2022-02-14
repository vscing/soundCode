/**
 * reactivity
 * vue3和vue2响应式完全不同
 */

let price = 5;
let quantity = 2;
let total = price * quantity;

console.log(`total is ${total}`);

price = 20;

console.log(`total is ${total}`);