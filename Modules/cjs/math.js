console.log("in math.js of commonjs module");

function sum(x, y){
    return x + y;
}

function multiply(x, y){
    return x * y;
}

// exports.sum = sum;
// exports.multiply = multiply;

module.exports = {
    sum,
    multiply
};

console.log("math module: ", module);


