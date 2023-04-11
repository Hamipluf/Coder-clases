// import CartsManager from "../dao/fileManager/CartsManager.js"; file manager
// const carts = new CartsManager("Carts.json");
import { Router } from "express";
import {
  createCart,
  getCart,
  getAllCarts,
  addProductToCart,
  udapteAllCart,
  udapteProductQuantity,
  deleteProductToCart,
  deleteAllProductsToCart,
} from "../controller/cart.controller.js";
const router = Router();

// Crea un carro sin nececidad de pasarle ningun parametro
router.post("/", createCart);
// Ver los carritos por id y buscar a todos los carritos
router.get("/:cid", getCart);
// Devuelve todos los carritos existentes
router.get("/", getAllCarts);
//Agregar producto con Cart id y Product id
router.post("/:cid/product/:pid", addProductToCart);
// Actualiza el carrito entero
router.put("/:cid", udapteAllCart);
// Actualiza la cantidad del producto por body
router.put("/:cid/products/:pid", udapteProductQuantity);
// Elimina el producto indicado por params (pid)
router.delete("/:cid/products/:pid", deleteProductToCart);
// Elimina todos los productos del carrito
router.delete("/:cid/", deleteAllProductsToCart);

export default router;
