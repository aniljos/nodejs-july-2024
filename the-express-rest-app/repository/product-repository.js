import { Product } from "../model/product.js";

export class ProductRepository{

    constructor(){
        this.products = [];
        this.products.push(new Product(1, "Apple Iphone 15", 10000, "Latest Smartphone from Apple"));
        this.products.push(new Product(2, "Dell Thinkpad", 16000, "Business Laptop from Dell"));
        this.products.push(new Product(3, "XBox One", 4000, "Gaming Console from Microsoft"));
        this.products.push(new Product(4, "Samsung A73", 8000, "Latest Smartphone from Samsung"));
    }

    fetchAll(){
        return this.products;
    }

    fetchById(id){

        const index = this.products.findIndex(p => p.id == id);
        if(index !== -1){
            return this.products[index];
        }
        else{
            return null;
        }
    }

    save(name, price, description){
        let product = new Product(this.products.length + 1, name, price, description);
        this.products.push(product);
        return product;
    }
}