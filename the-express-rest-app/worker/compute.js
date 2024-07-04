import {parentPort} from 'worker_threads';

function compute(arraySize){
     //cpu intensive task;
     const array =Array.from({length: arraySize}, (_, i) => i + 1);
     //process the array
     const result = array.map(item => item * item);
     return result;
}


parentPort.on("message", (arraySize) => {

    console.log("Worker received message from parent thread");
    const result = compute(arraySize);
    parentPort.postMessage({result: result.length});

});

