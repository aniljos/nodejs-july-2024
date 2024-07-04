import {connectToDB, pingDB} from './mongodb-connect.js';
import { Product } from "../model/product.js";

pingDB();

//fetch all products
export const fetchAllProducts = async () => {
    try {
        const db = await connectToDB();
        const collection = db.collection('products');
        const documents = await collection.find({}).toArray();
        // documents.forEach(document => {
        //     new Product(document.name, document.price, document.category);
        // });
        const products = documents.map(document => 
                             new Product(document.id, document.name, document.price, document.description));
        return products;
    } catch (error) {
        console.log('Error while fetching products: ', error);
        throw error;
    }
}
//fetch product by id
export const fetchProductById = async (id) => {
    try {
        const db = await connectToDB();
        const collection = db.collection('products');
        const document = await collection.findOne({id: Number(id)});
        return new Product(document.id, document.name, document.price, document.description);
    } catch (error) {
        console.log('Error while fetching product by id: ', error);
        throw error;
    }
}
//create a product
export const createProduct = async (product) => {
    try {
        
        product.id = Math.floor(Math.random() * 1000);
        const db = await connectToDB();
        const collection = db.collection('products');
        const result =  await collection.insertOne(product);
        return result;

    } catch (error) {
        console.log('Error while creating a product: ', error);
        throw error;
    }
}
//update a product
export const updateProduct = async (product) => {
    try {
        const db = await connectToDB();
        const collection = db.collection('products');
        const result =  await collection.updateOne({id: product.id}, {$set: product});
        return result;
    } catch (error) {
        console.log('Error while updating a product: ', error);
        throw error;
    }
}
//delete a product
export const deleteProduct = async (id) => {
    try {
        const db = await connectToDB();
        const collection = db.collection('products');
        const result =  await collection.deleteOne({id: Number(id)});
        return result;
    } catch (error) {
        console.log('Error while deleting a product: ', error);
        throw error;
    }
}
