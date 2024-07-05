import {Router} from 'express';
import {createProduct, fetchAllProducts,updateProduct, deleteProduct, fetchProductById} from '../repository/product-db-repository.js';
import bodyParser from 'body-parser';
import { verifyMiddleware } from '../middleware/verifyToken.js';
export const productRestDBRouter = Router();


//verfy jwt token
productRestDBRouter.use(verifyMiddleware);
//middleware for converting json to js objects
productRestDBRouter.use(bodyParser.json());;
//fetch all products
productRestDBRouter.get("/", async (req, resp) => {

    try {
        const products = await fetchAllProducts();
        resp.json(products);
    } catch (error) {
        resp.status(500).send();
    }
})
productRestDBRouter.get("/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        const product = await fetchProductById(id);
        if(product){
            resp.json(product);
        } else {
            resp.status(404).send();
        }
    } catch (error) {
        resp.status(500).send();
    }
})
productRestDBRouter.post("/", async (req, resp) => {

    try {
        
        const product = req.body;
        if(!product.name || !product.price || !product.description){
            resp.status(400).send();
            return;
        }
        const savedProduct = await createProduct(product);
        resp.status(201).send(savedProduct);

    } catch (error) {
        resp.status(500).send();
    }
})

productRestDBRouter.put("/", async (req, resp) => {

    try {
        
        const product = req.body;
        if(!product.id || !product.name || !product.price || !product.description){
            resp.status(400).send();
            return;
        }
        const updatedProduct = await updateProduct(product);
        resp.status(200).send(updatedProduct);

    } catch (error) {
        resp.status(500).send();
    }
})

productRestDBRouter.delete("/:id", async (req, resp) => {

    try {
        
        const id = req.params.id;
        const result = await deleteProduct(id);
        if(result.deletedCount > 0){
            resp.status(200).send();
        } else {
            resp.status(404).send();
        }

    } catch (error) {
        resp.status(500).send();
    }
});


