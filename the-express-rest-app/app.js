import express from 'express';
import chalk from 'chalk';
import { productRestRouter } from 
            './controllers/product-rest-controller.js';
import { productRestDBRouter } from './controllers/product-rest-db-controller.js';
import cors from 'cors';
import {Worker} from 'worker_threads';
import childprocess from 'child_process';

const app = express();

//middleware for cors
app.use(cors({origin: 'http://localhost:9040', methods: ['GET', 'POST',], allowedHeaders: []}));

//middleware for static files
app.use(express.static('public'));

//middleware to log the requests
app.use((req, resp, next) => {
    console.log(`Request recieved for ${req.url} on process id ${process.pid}`);
    next();
});

app.use("/products", productRestRouter);
app.use("/productsdb", productRestDBRouter);

app.get("/task", (req, resp) => {

    const worker = new Worker('./worker/compute.js');
    worker.on("error", () => {
        resp.status(500);
    });
    const arraySize = 100000000;
    worker.postMessage(arraySize);

    worker.on("message", (result) => {
        console.log("Parent received message from worker thread");

        resp.json({result});
    });
});
app.get("/child-process", (req, resp) => {

    const childProcess = childprocess.fork('./child-process/compute.js');
    childProcess.on("error", () => {
        resp.status(500);
    });
    const arraySize = 100000000;
    childProcess.send(arraySize);
    childProcess.on("message", (result) => {
        console.log("App.js received message from child process");
        resp.json({result});
    });

})



const port = 9001;
app.listen(port, () => {
    console.log(chalk.green(`Server is running on ${port}`));
});