import {Router} from 'express';
import { ProductRepository } from '../repository/product-repository.js';
import bodyParser from 'body-parser';
export const productRestRouter = Router();

const repository = new ProductRepository();

//middleware for converting json to js objects
productRestRouter.use(bodyParser.json());

//fetch all products
productRestRouter.get("/", (req, resp) => {

    const products = repository.fetchAll();
    resp.json(products);

})

//fetch product by id(http://localhost:9001/products/1)
productRestRouter.get("/:id", (req, resp) => {

    const productId = req.params.id;
    const product = repository.fetchById(productId);
    if(product){
        resp.json(product);
    }
    else{
        resp.status(404).send();
    }
})

//save product
productRestRouter.post("/", (req, resp) => {

    const product = req.body;
    if(!product.name || !product.price || !product.description){
        resp.status(400).send();
        return;
    }
    const savedProduct = repository.save(product.name, product.price, product.description);
    resp.status(201).send(savedProduct);

});