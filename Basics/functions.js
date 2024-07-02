// function declaration
//
function sum(x, y){

    console.log("in sum...");
    return x + y;
}
// function sum(){
//     console.log("in sum...no args");
// }

console.log("in sum", sum(10, 20));
sum();
sum(10, 20, 30, 40);

// function expression
const add = function add(x, y){
    return x + y;
}
console.log("add", add(10, 20));

console.log("sum name", sum.name);
console.log("sum length", sum.length);

