const yargs = require('yargs');
const tasks = require('./tasks');
const chalk = require('chalk');

console.log("Application to work with tasks");

//register/subscribe to the events
tasks.tasksEmitter.on("added", (task)=> {
    console.log(chalk.green.inverse("Task added: ", task.taskName, task.description));
});

tasks.tasksEmitter.on("deleted", (message)=> {
    console.log(chalk.yellow.inverse("Task deleted: ", message));
});

tasks.tasksEmitter.on("error", (error)=> {
    console.log(chalk.red("Error: ", error));
});


//read the command line arguments
//const args = process.argv;
const args = yargs.argv;
console.log("args", args);
const commandName = args._[0];

// add => node app.js add --taskName="task1" --desc="description"
// list => node app.js list
// delete => node app.js delete --taskName="task1"

if(commandName === "add"){
    console.log("Adding a task");
    const taskName = args.taskName;
    const desc = args.desc;
    // tasks.saveTask(taskName, desc, () => {
    //     console.log("In app.js: Task saved successfully");
    // }, (err) => {
    //     console.log("In app.js: error writing the task", err);
    // });
     tasks.saveTask(taskName, desc).then(() => {
        console.log("In app.js: Task saved successfully");	
     }, ()=> {
        console.log("In app.js: failed to save task")
     });
}
else if(commandName === "list"){
    tasks.readAllTasks().then((tasks) => {
        console.log("Tasks: ", tasks);
    })
}
else if(commandName === "delete"){
    const taskName = args.taskName;
    tasks.deleteTask(taskName).then(() => {
        console.log("Task deleted successfully");
    }, (error) => {
        console.log("Failed to delete the task");
    });
}
else{
    console.log("Invalid command");
}