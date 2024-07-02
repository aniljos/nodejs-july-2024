const fs = require('fs');
console.log("app.js streams demo");

console.log("process id", process.pid);

// process.stdin.on('data', (data) => {

//     console.log("text entered", data.toString());
//     if(data.toString().trim() === 'exit'){
//         process.exit();
//     }
// });

//Reading from a file
// const rstream  = fs.createReadStream('data.txt', {encoding: 'utf8', highWaterMark: 2000});
// rstream.on('data', (chucks) => {

//     console.log(chucks.toString());
//     console.log("chucks length", chucks.length);

// })

const rstream_paused  = fs.createReadStream('data.txt', {encoding: 'utf8', highWaterMark: 2000});
rstream_paused.on('readable', () => {

    let data = rstream_paused.read();
    while(data !== null){
        
        console.log("data", data.toString());
        console.log("data length", data.length);
        data = rstream_paused.read();
    }

});









