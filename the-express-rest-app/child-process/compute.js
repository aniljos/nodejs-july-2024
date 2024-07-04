

function compute(arraySize){
     //cpu intensive task;
     const array =Array.from({length: arraySize}, (_, i) => i + 1);
     //process the array
     const result = array.map(item => item * item);
     return result;
}


process.on("message", (arraySize) => {

    console.log("Child process received message from parent thread: " + process.pid);
    const result = compute(arraySize);
    process.send({result: result.length});

});

