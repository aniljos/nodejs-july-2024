const fs = require('fs');
console.log("event-loop-demo.js: Start");

setTimeout(() => {
    console.log("set timeout(1sec) 1")
}, 1000);

setTimeout(() => {
    console.log("set timeout(0sec) 1")
}, 0);

setImmediate(() => {
    console.log("set immediate 1")
});

fs.readFile(__filename, () => {

    console.log("file read 1")

    setTimeout(() => {
        console.log("set timeout(0sec) 2")
    }, 0);
    
    setImmediate(() => {
        console.log("set immediate 2")
    });
})

process.nextTick(() => {
    console.log("process next tick 1")
})
console.log("event-loop-demo.js: End");

