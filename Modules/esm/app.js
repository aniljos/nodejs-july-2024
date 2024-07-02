import {sum, multiply} from './math.js'
console.log("app.js of esm modules");

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
console.log("__filename: ", __filename);

import {dirname} from 'path';
const __dirname = dirname(__filename);
console.log("__dirname: ", __dirname);


//import cjs module in esm module
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const compute = require('./compute.cjs');

console.log("sum: ", sum(2, 3));
console.log("multiply", multiply(7, 9));

console.log("calculate: ", compute.calculate(2, 3));

//import cjs module in esm module using dymanic import
import('./process.cjs').then((processModule)=> {
    console.log("process.cjs loaded");
    processModule.execute();

})




