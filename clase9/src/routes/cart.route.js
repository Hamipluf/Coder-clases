import { Router } from "express";
import CartsManager from "../utils/CartsManager.js";
const router = Router();
const carts = new CartsManager("Carts.json");

// Crea un carro sin nececidad de pasarle ningun parametro
router.post("/", async (req, res) => {
  try {
    const newCart = await carts.createCart();
    res.status(200).send({
      status: "Successful",
      message: "El carrito a sido creado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("No se pudo crear el carrito");
  }
});
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const addProductToCart = carts.addProductToCart(cid, pid);
    res.status(200).send({
      status: "Successful",
      message: "El producto a sido agregado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("No se pudo agregar el producto");
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const getCartById = await carts.getCartsById(parseInt(cid));
    if (getCartById === null) {
      res
        .status(404)
        .send({ status: "Errror", message: "Carrito no encontrado" });
    } else {
      res
        .status(200)
        .send({ stsatus: "Successful", products: getCartById.products }); // devuelve {}
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error", message: "No se pudo obtener el carrito" });
  }
});

export default router;
