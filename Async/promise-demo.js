console.log("promise demo");


function getValue(number) {

    return new Promise((resolve, reject) => {

        // number is greater than 10 ==> success else ==> failure
        setTimeout(() => {
            //calc login here
            if (number > 10) {
                resolve(number * number);
            }
            else {
                reject("Error: Number is less than 10");
            }
        }, 1000)
    });
}

// const promise = getValue(100);
// promise.then((result) => {
//     console.log("Success: ", result);


// }, (errorMsg) => {
//     console.log("Error: ", errorMsg);
// });

async function invoke(){

    try{
        //resolved
        let result = await getValue(100);
        console.log("Success: ", result);
        result = await getValue(80);
        console.log("Success: ", result);
        result = await getValue(60);
        console.log("Success: ", result);
    }
    catch(err){
        //rejected
        console.log("Error: ", err);
    }
    
}
invoke();

console.log("end of script");
