import { Router } from "express";
import { ProductsManager } from "../ProductsManager.js";

const router = Router();
const productsManager = new ProductsManager();
router.get("/", async (req, res) => {
  const products = await productsManager.getProducts();
  if (products.length !== 0) {
    res.json({ products });
  } else {
    res.send("No hay productos que devolver");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params; //es un string

  const product = await productsManager.getProductsById(id);
  if (product) {
    res.json({ product });
  } else {
    res.send("Producto no existe en BD");
  }
});

router.post("/", async (req, res) => {
  const objProduct = req.body;
  const newProduct = await productsManager.createProduct(objProduct);
  
});

router.put("/:id", (req, res) => {
  const { id } = req.params; //es un string
  const objProduct = req.body;
});

router.delete("/:id", (req, res) => {
  const { id } = req.params; //es un string
});
export default router;
