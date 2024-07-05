import request from 'supertest';
import express from 'express';
import { productRestDBRouter } from '../controller/product-db-controller.js'; // Ensure the correct path
import * as productRepository from '../repository/product-db-repository.js';

// Mock the product repository functions
jest.mock('../repository/product-db-repository.js');

const app = express();
app.use(express.json());
app.use('/products', productRestDBRouter);

describe('GET /products', () => {
  it('should respond with a list of products', async () => {
    const mockProducts = [{ id: 1, name: 'Product 1', price: 10, description: 'Description 1' }];
    productRepository.fetchAllProducts.mockResolvedValue(mockProducts);

    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
  });

  it('should respond with 500 if fetching products fails', async () => {
    productRepository.fetchAllProducts.mockRejectedValue(new Error('Failed to fetch products'));

    const response = await request(app).get('/products');
    expect(response.status).toBe(500);
  });
});

describe('GET /products/:id', () => {
  it('should respond with a product if found', async () => {
    const mockProduct = { id: 1, name: 'Product 1', price: 10, description: 'Description 1' };
    productRepository.fetchProductById.mockResolvedValue(mockProduct);

    const response = await request(app).get('/products/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProduct);
  });

  it('should respond with 404 if product not found', async () => {
    productRepository.fetchProductById.mockResolvedValue(null);

    const response = await request(app).get('/products/999');
    expect(response.status).toBe(404);
  });

  it('should respond with 500 if fetching product by id fails', async () => {
    productRepository.fetchProductById.mockRejectedValue(new Error('Failed to fetch product'));

    const response = await request(app).get('/products/1');
    expect(response.status).toBe(500);
  });
});

describe('POST /products', () => {
  it('should create a new product', async () => {
    const newProduct = { id: 11, name: 'Product 11', price: 110, description: 'Description 11' };
    productRepository.createProduct.mockResolvedValue(newProduct);

    const response = await request(app)
      .post('/products')
      .send(newProduct)
      .set('Accept', 'application/json');
    expect(response.status).toBe(201);
    expect(response.body).toEqual(newProduct);
  });

  it('should respond with 400 if required fields are missing', async () => {
    const incompleteProduct = { name: 'Product 12' };

    const response = await request(app)
      .post('/products')
      .send(incompleteProduct)
      .set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });

  it('should respond with 500 if creating product fails', async () => {
    productRepository.createProduct.mockRejectedValue(new Error('Failed to create product'));

    const response = await request(app)
      .post('/products')
      .send({ id: 11, name: 'Product 11', price: 110, description: 'Description 11' })
      .set('Accept', 'application/json');
    expect(response.status).toBe(500);
  });
});

describe('PUT /products', () => {
  it('should update a product', async () => {
    const updatedProduct = { id: 1, name: 'Updated Product', price: 20, description: 'Updated Description' };
    productRepository.updateProduct.mockResolvedValue(updatedProduct);

    const response = await request(app)
      .put('/products')
      .send(updatedProduct)
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedProduct);
  });

  it('should respond with 400 if required fields are missing', async () => {
    const incompleteProduct = { id: 1, name: 'Product 12' };

    const response = await request(app)
      .put('/products')
      .send(incompleteProduct)
      .set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });

  it('should respond with 500 if updating product fails', async () => {
    productRepository.updateProduct.mockRejectedValue(new Error('Failed to update product'));

    const response = await request(app)
      .put('/products')
      .send({ id: 1, name: 'Updated Product', price: 20, description: 'Updated Description' })
      .set('Accept', 'application/json');
    expect(response.status).toBe(500);
  });
});

describe('DELETE /products/:id', () => {
  it('should delete a product', async () => {
    productRepository.deleteProduct.mockResolvedValue({ deletedCount: 1 });

    const response = await request(app).delete('/products/1');
    expect(response.status).toBe(200);
  });

  it('should respond with 404 if product not found', async () => {
    productRepository.deleteProduct.mockResolvedValue({ deletedCount: 0 });

    const response = await request(app).delete('/products/999');
    expect(response.status).toBe(404);
  });

  it('should respond with 500 if deleting product fails', async () => {
    productRepository.deleteProduct.mockRejectedValue(new Error('Failed to delete product'));

    const response = await request(app).delete('/products/1');
    expect(response.status).toBe(500);
  });
});
