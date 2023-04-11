import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  udapteProduct,
} from "../controller/products.controller.js";
const router = Router();

// Devuelve el prodcto por los filtros:
// sort(ordena de forma acendente "asc", o descendente "desc" el precio)
// limit(da el limite de productos que necesitas que te devuelvan)
// page(la pagina a la que necesitas ir)
// query(te trae los elementos por la categora o por el estado del producto segun el stock)
//(en caso de no aclarar limite devuelve todos los productos)
router.get("/", getAllProducts);
// devuelve el producto por id por params
router.get("/:pid", getProductById);
// Agrega el producto con persistencia, devuelve {status:"", message:""}
router.post("/", addProduct);
// Actualiza un producto con el pid por params
router.put("/:pid", udapteProduct);
// Elimina un producto con id por params
router.delete("/:pid", deleteProduct);

export default router;
