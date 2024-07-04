import express from 'express';
import chalk from 'chalk';
import { productRestRouter } from 
            './controllers/product-rest-controller.js';
import { productRestDBRouter } from './controllers/product-rest-db-controller.js';

const app = express();

app.use("/products", productRestRouter);
app.use("/productsdb", productRestDBRouter);


const port = 9001;
app.listen(port, () => {
    console.log(chalk.green(`Server is running on ${port}`));
});