import express,{Router} from 'express';
import { ProductRepository } from '../repository/product-repository.js';

export const productWebRouter = Router();
const repository = new ProductRepository();

//middleware to process form data and covert to a JS object
productWebRouter.use(express.urlencoded({extended: true}));

productWebRouter.get('/', (req, res) => {

    res.render('index', 
                        { 
                            title: "EJS Web Application", 
                            message: "Node.js, Express and EJS Web Application"
                        });
});

productWebRouter.get("/list", (req, resp) => {

    const products = repository.fetchAll();
    resp.render('listProducts', { products: products });
});

productWebRouter.get("/add", (req, resp)=> {

    resp.render('addProduct');

})

productWebRouter.post("/save", (req, resp)=> {

    //req.body; req.headers
    const data = req.body;
    repository.save(data.name, data.price, data.desc);
    const products = repository.fetchAll();
    resp.render('listProducts', { products: products });

})