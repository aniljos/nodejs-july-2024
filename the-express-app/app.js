//const express = require('express');
import chalk from 'chalk';
import express from 'express';
import { productWebRouter } from './controllers/product-web-controller.js';


// Create an Express application
const app = express();

//view template engine=> App level middleware
app.set('view engine', 'ejs');
//static middleware=> App level middleware
app.use(express.static('public'));

//logging middleware=> App level middleware
app.use((req, res, next) => {
    console.log(chalk.whiteBright
                (`Request ${req.url} with method ${req.method} received at ${new Date().toLocaleString()}`));
    next();
});

app.use("/product-web", productWebRouter)

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200);
    res.send('Hello Express Applications');
});
app.get('/about',(req, resp) => {
    resp.setHeader('Content-Type', 'text/plain');
    resp.status(200);
    resp.send('This is an express application created using Node.js');
})

const PORT = 9000;
app.listen(PORT, ()=> {
    console.log(chalk.yellow.inverse(`Server is running on port ${PORT}`));
});

