// import CartsManager from "../dao/fileManager/CartsManager.js"; file manager
// const carts = new CartsManager("Carts.json");
import { Router } from "express";
import CartsManager from "../dao/mongoManager/CartsManager.js";
const carts = new CartsManager();
const router = Router();

// Crea un carro sin nececidad de pasarle ningun parametro
router.post("/", async (req, res) => {
  try {
    const createCart = await carts.createCart();
    res.status(200).send({
      status: "Successful",
      message: "El carrito a sido creado correctamente",
    });
  } catch (error) {
    console.log("ERROR createCart POST", error);
    res.status(500).send("No se pudo crear el carrito");
  }
});
router.get("/", async (req, res) => {
  try {
    const getCarts = await carts.getCarts();
    res.status(200).send({
      status: "Successful",
      data: getCarts,
    });
  } catch (error) {
    console.log("ERROR getCarts GET", error);
    res.status(500).send("No se pudo encontrar el carrito");
  }
});
//Agregar producto con Cart id y Product id
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params; // son Strings

  try {
    const addProductToCart = await carts.addProductToCart(cid, pid);
    res.status(200).send({
      status: "Successful",
      message: "Producto añadido correctamente",
      data: addProductToCart,
    });
  } catch (error) {
    console.log("ERROR craddProductToCart POST", error);
    res.status(500).send("No se pudo agregar el producto");
  }
});
// Ver los carritos por id y buscar a todos los carritos
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const getCartById = await carts.getCartsById(cid);
    res.status(200).send({
      status: "Successful",
      data: getCartById,
    });
  } catch (error) {
    console.log("ERROR getCartById GET", error);
    res
      .status(500)
      .send({ status: "Error", message: "No se pudo obtener el carrito" });
  }
});
router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params; // son Strings
  try {
    const deleteProduct = await carts.deleteProductToCart(cid, pid);
    if (deleteProduct === null) {
      res.status(404).send({
        status: "Error",
        message: "No se pudo encontrar el producto",
      });
    } else {
      res.status(200).send({
        status: "Successful",
        message: "Producto eliminado correctamente",
      });
    }
  } catch (error) {
    console.log("ERROR deleteProductToCart DELETE", error);
    res.status(500).send({
      status: "Error",
      message: "No se pudo eliminar el producto del carrito",
    });
  }
});
router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const udapteCart = await carts.udapteCart(cid);
    res.status(200).send({
      status: "Successful",
      data: udapteCart,
    });
  } catch (error) {
    console.log("ERROR udapteCart PUT", error);
    res.status(500).send({
      status: "Error",
      message: "No se pudo actualizar el carrito",
    });
  }
});

export default router;
