const EventEmitter = require('node:events');
const fs = require('node:fs');
const fspromise = require('node:fs/promises');
const fileName = "tasks.json";

// added ==> fired/emitted when a new task is added
// deleted ==> fired/emitted when a task is deleted
// error ==> fired/emitted when an error occurs
const tasksEmitter = new EventEmitter();


// function saveTask(taskName, description, onSuccess, onError){

//     const task = {
//         taskName: taskName,
//         description: description
//     }
//     readAllTasks((tasks) => {

//         tasks.push(task);
//         fs.writeFile(fileName, JSON.stringify(tasks), (err) => {

//             if(err){
//                 console.log("error writing the task");
//                 if(onError){
//                     onError(err);
//                 }
//                 return;
//             }
//             console.log("Task saved successfully");
//             if(onSuccess){
//                 onSuccess();
//             }
//         });
//     })
// }

// function readAllTasks(onComplete){

//     fs.readFile(fileName, (err, contents) => {

//         if(err){
//             console.log("error reading the tasks");
//             if(onComplete){
//                 onComplete([]);
//             }
//             return;
//         }
//         if(onComplete){
//             onComplete(JSON.parse(contents));
//         }
//     });
// }

async function saveTask(taskName, description){

    const task = {
        taskName: taskName,
        description: description
    }
    let allTasks = [];
    try {
        allTasks = await readAllTasks();
    } catch (error) {
       // allTasks = [];
    }
    
    try{
        allTasks.push(task);
        await fspromise.writeFile(fileName, JSON.stringify(allTasks));
        tasksEmitter.emit('added', task);
    }
    catch(err){
        console.log("error writing the task");
        tasksEmitter.emit('error', err);
        throw err; // implicit reject(err)
    }

    
}

async function readAllTasks(){

    // implicitly return a promise
    try {
        const contents = await fspromise.readFile(fileName);
        return JSON.parse(contents); // implicit resolve(JSON.parse(contents)

    } catch (error) {
        return []; // implicit resolve([])
    }

}
async function deleteTask(taskName){
    let allTasks = [];
    try {
        allTasks = await readAllTasks();
        const index_of_task_to_remove = allTasks.findIndex((task) => task.taskName === taskName);

        if(index_of_task_to_remove !== -1){
            allTasks.splice(index_of_task_to_remove, 1);
            await fspromise.writeFile(fileName, JSON.stringify(allTasks));
            tasksEmitter.emit('deleted', taskName);
            return "deleted task successfully";
        }
        else{
            tasksEmitter.emit('error', "Task not found");
            throw new Error("Task not found");
        }
        
    } catch (error) {
        tasksEmitter.emit('error', error);
       throw error;
    }
    
}


module.exports = {
    saveTask, readAllTasks, deleteTask, tasksEmitter
}