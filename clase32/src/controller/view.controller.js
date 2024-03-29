import ProductManager from "../persistencia/DAOs/productsDAO/ProductsMongo.js";
import CartManager from "../persistencia/DAOs/cartsDAO/CartsMongo.js";
import UserManager from "../persistencia/DAOs/usersDAO/UsersMongo.js";
const productManager = new ProductManager();
const cartManager = new CartManager();
const userManager = new UserManager();
export const loginView = (req, res) => {
  res.render("login");
};
export const homeView = async (req, res) => {
  const { limit = 10, page = 1, sort, ...query } = req.query; // devuelve string
  const products = await productManager.getProducts(
    parseInt(limit),
    parseInt(page),
    query,
    sort
  );
  const document = products.docs;
  const user = req.user.role === "user" ? true : false
  res.render("home", { document, user});
};
export const registerView = (req, res) => {
  res.render("registro");
};
export const profileView = (req, res) => {
  res.render("profile");
};
export const errorRegistroView = (req, res) => {
  res.render("errorRegistro");
};
export const cartView = async (req, res) => {
  const cid = req.query.cart;
  console.log(cid);
  const carts = await cartManager.getCartsById(cid);
  res.send(carts);
  // res.render("cart");
};
