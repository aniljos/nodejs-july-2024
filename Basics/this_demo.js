var x = 10; // Global variable(browser) or Module variable(Node.js)

global.y = 20; // Global variable in Node.js

global.globalFn = function(){
    console.log("in globalFn");
    console.log("this in globalFn", this);// this is global object
}

function moduleFn(){
    console.log("in moduleFn");
    console.log("this in moduleFn", this); // this is global object
}

//global.globalFn();
//moduleFn();

var obj = {
    id: 1,
    print: function(){
        console.log("in print");
        console.log("id: ", this.id); 
        console.log("this in print: ", this); 
        const _this = this;
        //setTimeout(callback, delay);
        setTimeout(function(){
            console.log("id in the timeout: ", _this.id); 
            console.log("this in callback: ", this); 
        }, 1000)
        //
        setTimeout(()=>{
            console.log("id in the timeout(arrow fn): ", this.id); 
            console.log("this in callback(arrow fn): ", this); 
        }, 1000)


    }
}
obj.print();