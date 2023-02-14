import express, { urlencoded } from "express";
import productRoute from "./routes/products.route.js";
import * as dotenv from "dotenv";
dotenv.config();

import "./db/dbConfig.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// para que entienda los datos al entrar
app.use(urlencoded({ extended: true }));
// siempre que trabajamos con expres se configura los dos midlewere

app.use("/products", productRoute);

app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto ${PORT}`);
});
