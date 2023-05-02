import cartServices from "../../../services/carts.services.js";
import productsServices from "../../../services/products.services.js";
import CustomError from "../../../utils/errors.js";
import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsStatus,
} from "../../../utils/error.enum.js";
export default class CartsManager {
  // Obtiene los carritos creados
  async getCarts() {
    try {
      const cart = await cartServices.getAllCarts();
      return cart;
    } catch (error) {
      const customError = CustomError.createCustomError({
        name: ErrorsStatus.CART_ERROR,
        cause: ErrorsCause.CART_ERROR,
        message: ErrorsMessage.CART_ERROR,
      });

      return customError;
    }
  }
  // obtiene el producto segun el id pasado
  async getCartsById(id) {
    if (!id) {
      const customError = CustomError.createCustomError({
        name: ErrorsStatus.CART_ERROR,
        cause: ErrorsCause.CART_ERROR,
        message: ErrorsMessage.CART_ERROR,
      });
      return customError;
    }
    try {
      const cartById = await cartServices.getOneCartById(id);
      return cartById;
    } catch (error) {
      console.log("ERROR getCartsById", error);
      const message = {
        status: "error",
        message: "No hay carritos o no se pudo acceder a la base de datos",
      };
      return message;
    }
  }
  // Crea un carro sin nececidad de pasarle ningun parametro
  async createCart(obj) {
    try {
      const createCart = await cartServices.createCart(obj);
      return createCart;
    } catch (error) {
      console.log("ERROR createCart", error);
      const message = {
        status: "error",
        message: "No se pudo crear el carrito",
      };
      return message;
    }
  }
  // primero el id del producto desp el id del cart en el endpoint
  async addProductToCart(cid, pid) {
    if (!cid || !pid) {
      CustomError.createCustomError({
        name: ErrorsStatus.PRODUCT_DATA_INCOMPLETE,
        cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
      });
    }
    try {
      const cartById = await cartServices.getOneCartById(cid);
      const productById = await productsServices.getOneProductById(pid);
      console.log(productById);
      if (productById.stock === 0) {
        const response = {
          status: "Error",
          message: "No hay stock",
        };
        return response;
      }

      const filter = cartById.products.find((element) => element._id == pid);
      if (filter === undefined) {
        cartById.products.push(pid);
      } else {
        filter.quantity++;
        productById.stock--;
      }

      cartById.save();
      productById.save();
      return cartById;
    } catch (error) {
      console.log(error);
      const message = {
        status: "Error",
        message: "No se pudo crear agregar el producto al carrito",
      };
      return message;
    }
  }
  // Elimina un el producto por el id del carrito
  async deleteProductToCart(cid, pid) {
    if (!cid || !pid) {
      const customError = CustomError.createCustomError({
        name: ErrorsStatus.PRODUCT_DATA_INCOMPLETE,
        cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
      });
    }
    try {
      const cartById = await cartServices.getOneCartById(cid);
      const indexToProductDelete = cartById.products.findIndex(
        (element) => element.id == pid
      );
      if (indexToProductDelete === -1) {
        const message = {
          status: "error",
          message: "No se encontro el producto",
        };
        return message;
      } else {
        cartById.products.splice(indexToProductDelete, 1);
        cartById.save();
        return cartById;
      }
    } catch (error) {
      console.log("deleteProductToCart MONGO", error);
      const message = {
        status: "error",
        message: "No se encontro el carrito",
      };
      return message;
    }
  }
  // Actualiza el carrito entero
  async udapteCart(cid, pUdapted) {
    if (!cid) {
      const customError = CustomError.createCustomError({
        name: ErrorsStatus.PRODUCT_DATA_INCOMPLETE,
        cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
      });
    }
    try {
      const cartById = await cartServices.udapteAllCart(cid, {
        products: pUdapted,
      });
      return cartById;
    } catch (error) {
      const message = {
        status: "error",
        message: "No se pudo actualizar el carrtio",
      };
      return message;
    }
  }
  // Actualiza la cantidad  del producto por body
  async udapteProductToCart(cid, pid, quantity) {
    try {
      const cartById = await cartServices.getOneCartById(cid);
      const quantityUdapte = cartById.products.filter(
        (element) => element.id == pid
      );
      if (quantityUdapte.length === 0) {
        CustomError.createCustomError({
          name: ErrorsStatus.CART_ERROR_QUANTITY,
          cause: ErrorsCause.CART_ERROR_QUANTITY,
          message: ErrorsMessage.CART_ERROR_QUANTITY,
        });
      } else {
        quantityUdapte.forEach((element) => {
          element.quantity = quantity;
        });
        cartById.save();
        return cartById;
      }
    } catch (error) {
      console.log("udapteProductToCart MONGO", error);
      const message = {
        status: "error",
        message: "No se encontro el carrito",
      };
      return message;
    }
  }
  async deleteAllProductToCart(cid) {
    if (!cid) {
      CustomError.createCustomError({
        name: ErrorsStatus.PRODUCT_DATA_INCOMPLETE,
        cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
      });
    }
    try {
      const deleteProducts = await cartServices.deleteAllProduct(cid, {
        products: [],
      });
      return deleteProducts;
    } catch (error) {
      console.log("deleteAllProductToCart MONGO", error);
      const message = {
        status: "error",
        message: "No se pudo eliminar los productos del carrito",
      };
      return message;
    }
  }
}
