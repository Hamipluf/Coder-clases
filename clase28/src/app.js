import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
//passport
import passport from "passport";
import "./passport/passportStrategies.js";

import { __dirname } from "./utils.js";
import { join } from "path";
import realTimeProducts from "./routes/realTimeProducts.route.js";
import cartRoute from "./routes/cart.route.js";
import productsRoute from "./routes/products.route.js";
import userRoute from "./routes/user.route.js";
import sessionRoute from "./routes/session.route.js";
import view from "./routes/views.router.js";
import chat from "./routes/messages.route.js";
// Mongo DB
import "./dao/dbConfig.js";
//DOTENV
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_COOKIE));

// archivos estaticos
app.use(express.static(__dirname + "/public"));

// Motor de plantillas
app.set("views", join(__dirname, "views"));
// config de hadlebars
const hbs = handlebars.create({
  defaultLayout: "main",
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"),
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

//inicializar passport
app.use(passport.initialize());

//Rutas
app.use("/", view);
app.use("/chat", chat);
app.use("/realtimeproducts", realTimeProducts);
app.use("/api/products", productsRoute);
app.use("/api/carts", cartRoute);
app.use("/api/auth", userRoute);
app.use("/api/sessions", sessionRoute);

const httpServer = app.listen(8080, () => {
  console.log("Escuchando al puerto", 8080);
});

// websocket

export const socketServer = new Server(httpServer);
