// var x = undefined; var y = undefined; ==> Hoisting

console.log("Hello Nodejs!");

console.log("x", x);
var x = 10; 
console.log("x", x); // 10

var y;
console.log("y", y); //undefined

foo();

function foo(){
    //var msg = undefined;

    console.log("in foo");
    if(x <= 10){
        var msg = "x is less than or eq 10";
        let msg1 = "x is less than or eq 10";
        console.log("msg1", msg1);
    }
    console.log("msg", msg); 
     
}

//console.log("z", z); // ReferenceError: z is not defined