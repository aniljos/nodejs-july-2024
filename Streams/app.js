const fs = require('fs');

// const stream = require('stream');
// const Transform = stream.Transform;
// const pipeline = stream.pipeline;
const {Transform, pipeline} = require('stream');
const {createGzip}  = require('zlib');


console.log("app.js streams demo");

console.log("process id", process.pid);

// process.stdin.on('data', (data) => {

//     console.log("text entered", data.toString());
//     if(data.toString().trim() === 'exit'){
//         process.exit();
//     }
// });



function readStreamInFlowState() {
    //Reading from a file
    const rstream = fs.createReadStream('data.txt', { encoding: 'utf8', highWaterMark: 2000 });
    rstream.on('data', (chucks) => {

        console.log(chucks.toString());
        console.log("chucks length", chucks.length);

    })
}
function readStreamInPausedState() {
    const rstream_paused = fs.createReadStream('data.txt', { encoding: 'utf8', highWaterMark: 2000 });
    rstream_paused.on('readable', () => {

        let data = rstream_paused.read();
        while (data !== null) {

            console.log("data", data.toString());
            console.log("data length", data.length);
            data = rstream_paused.read();
        }

    });
    rstream_paused.on('end', () => {
        console.log("file reading completed");
    });

    rstream_paused.on('error', () => {
        console.log("error reading file");
    });
}

function pipeStdProcessStream(){

    process.stdin.pipe(process.stdout);
}
//pipeStdProcessStream();

function copyFileUsingStreams(){

    fs.createReadStream('data.txt').pipe(fs.createWriteStream('data_copy.txt'));

}

const uppercaseTransform = new Transform({
    transform: (chucks, encoding, callback)=> {

        callback(null, chucks.toString().toUpperCase());
    
    }
});
function copyFileUsingStreamsAndTransform(){
    pipeline(

        fs.createReadStream('data.txt'),
        uppercaseTransform,
        createGzip(),
        fs.createWriteStream('data_copy_uppercase.txt.gz'),
        (err) => {
            if(err){
                console.log("error", err);
            }else{
                console.log("file copied successfully");
            }
        }
    );

    
}
//copyFileUsingStreams();
copyFileUsingStreamsAndTransform();
    











