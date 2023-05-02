import { porductsModel } from "../persistencia/mongoDB/models/products.model.js";

class ProductService {
  constructor(model) {
    this.model = model;
  }

  addProductSercice = async (obj) => {
    const product = await this.model.create(obj);
    return product;
  };
  getOneProductById = async (id) => {
    const product = await this.model.findById(id);
    return product;
  };
  getProdctPaginate = async (query, filtro) => {
    const products = await this.model.paginate(query, filtro);
    return products;
  };
  deleteOneProduct = async (id) => {
    const productDeleted = await this.model.findByIdAndDelete(id);
    return productDeleted;
  };
  udapteOneProduct = async (id, obj) => {
    const productUdapted = await this.model.findByIdAndUpdate(id, obj);
    return productUdapted;
  };
}
const productServices = new ProductService(porductsModel);

export default productServices;
