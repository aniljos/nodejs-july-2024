import chalk from 'chalk';
import cluster from 'cluster';
import os from 'os';

//This is to check if its the master process
if(cluster.isPrimary){

    console.log(chalk.whiteBright( `Primary process id is ${process.pid}`));
    const count_of_cpus = os.cpus().length;
    console.log(chalk.whiteBright(`Count of CPUs is ${count_of_cpus}`));
    for(let i = 0; i < count_of_cpus; i++){
        const worker = cluster.fork();
        worker.on('online', () => {
            console.log(chalk.greenBright(`Worker started with process id ${worker.process.pid}`));
        })
        worker.on('exit', (code, signal) => {
            console.log(chalk.redBright(`Worker stopped with process id ${worker.process.pid}`));
        })
    }


}
else{
    // This is the worker process
    //esm
    import("./app.js");

    //cjs
    //require("./app.js");
}