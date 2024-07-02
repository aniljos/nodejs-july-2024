console.log("in app.js of commonjs module");

const math =  require('./math.js');

console.log("__filename: ", __filename);
console.log("__dirname: ", __dirname);
console.log("app.js module: ", module);


console.log("sum: ", math.sum(10, 20));
console.log("multiply: ", math.multiply(10, 20));

//import esm module in cjs module
import('./process.mjs').then((processModule) => {

    console.log("process.mjs loaded");
    processModule.execute();
})