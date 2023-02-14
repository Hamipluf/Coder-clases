import { porductsModel } from "./db/models/products.model.js";

export class ProductsManager {
  async getProducts() {
    try {
      const products = await porductsModel.find({});
      return products;
    } catch (error) {
      console.log(error);
    }
  }
  async getProductsById(id) {
    try {
      const product = await porductsModel.findById(id);
      return product;
    } catch (error) {
      console.log(error);
    }
  }
  async createProduct(obj) {
    try {
      const newProduct = await porductsModel.create(obj);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }
}
