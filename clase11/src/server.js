import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import { __dirname } from "./utils.js";

import realTimeProducts from "./routes/realTimeProducts.route.js";
import cartRoute from "./routes/cart.route.js";
import productsRoute from "./routes/products.route.js";
import inicio from "./routes/inicio.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// archivos estaticos
app.use(express.static(__dirname + "/public"));

// motores de plantilla
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//Rutas
app.use("/", inicio);
app.use("/realtimeproducts", realTimeProducts);
app.use("/api/products", productsRoute);
app.use("/api/carts", cartRoute);

const httpServer = app.listen(8080, () => {
  console.log("Escuchando al puerto", 8080);
});

// websocket

const socketServer = new Server(httpServer);
