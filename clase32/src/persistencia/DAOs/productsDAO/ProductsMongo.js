import productService from "../../../services/products.services.js";
import CustomError from "../../../utils/errors.js";
import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsStatus,
} from "../../../utils/error.enum.js";
export default class ProductManager {
  async getProducts(limit, page, query, sort) {
    const filtro = {
      limit,
      page,
      sort: sort ? { price: sort } : {},
    };

    try {
      const filterProducts = await productService.getProdctPaginate(
        query,
        filtro
      );
      return filterProducts;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async getProductsById(id) {
    try {
      const productById = await productService.getOneProductById(id);
      return productById;
    } catch (error) {
      CustomError.createCustomError({
        name: ErrorsStatus.PRODUCT_DATA_INCOMPLETE,
        cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
      });
      return error;
    }
  }
  async addProduct(product) {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = product;
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      !category
    ) {
      CustomError.createCustomError({
        name: ErrorsStatus.PRODUCT_DATA_INCOMPLETE,
        cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
      });
      return null;
    }
    // Normalizo el producto colocando todo en minuscula para que en las consultas por querys y params no haya confusiones
    const productNormalize = {
      title: title.toLowerCase(),
      description: description.toLowerCase(),
      code,
      price,
      status,
      stock,
      category: category.toLowerCase(),
      thumbnail,
    };
    try {
      const newProduct = await productService.addProductSercice(
        productNormalize
      );
      return newProduct;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async deleteProduct(id) {
    if (!id) {
      CustomError.createCustomError({
        name: ErrorsStatus.PRODUCT_DATA_INCOMPLETE,
        cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
      });
      return ErrorsMessage.PRODUCT_DATA_INCOMPLETE;
    }
    try {
      const deleteProduct = await productService.deleteOneProduct(id);
      return deleteProduct;
    } catch (error) { 
      CustomError.createCustomError({
        name: ErrorsStatus.PRODUCT_DATA_INCORRECT,
        cause: ErrorsCause.PRODUCT_DATA_INCORRECT,
        message: ErrorsMessage.PRODUCT_DATA_INCORRECT,
      });
      return error;
    }
  }
  async udapteProduct(id, productUdapted) {
    if (!id) {
      CustomError.createCustomError({
        name: ErrorsStatus.PRODUCT_DATA_INCOMPLETE,
        cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
      });
      return ErrorsMessage.PRODUCT_DATA_INCOMPLETE;
    }
    const productOld = productService.getOneProductById(id);
    const {
      title,
      price,
      description,
      code,
      status,
      stock,
      category,
      thumbnail,
    } = productUdapted;
    try {
      const productUdapted = await productService.udapteOneProduct(id, {
        title: title ? title : productOld.title,
        description: description ? description : productOld.description,
        code: code ? code : productOld.code,
        price: price ? price : productOld.price,
        status: status ? status : productOld.status,
        stock: stock ? stock : productOld.stock,
        category: category ? category : productOld.category,
        thumbnail: thumbnail ? thumbnail : productOld.thumbnail,
      });
      return productUdapted;
    } catch (error) {
      console.log("udapteProduct MONGO", error);
      return error;
    }
  }
}
