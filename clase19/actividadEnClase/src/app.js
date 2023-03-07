import express from "express";
import handlebars from "express-handlebars";
import { join } from "path";
import { __dirname } from "./utils.js";
import cookieParser from "cookie-parser";
import session from "express-session";

import loginRouter from "./routes/login.router.js";
import viewsRouter from "./routes/view.router.js";
const app = express();
const PORT = 3001;
const cookieKey = "SecretaCookie"; // va en .env

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// archivos estaticos
app.use(express.static(__dirname + "/public"));

// Cookie y sessioStorage
app.use(cookieParser(cookieKey)); //cookieKey es para hacer cookies firmadas
app.use(
  session({
    secret: "secretCoder19", // se guarda en .env
    resave: false,
    saveUninitialized: true,
  })
);

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

// RUTAS
app.use("/login", loginRouter);
app.use("/view", viewsRouter);

const httpServer = app.listen(PORT, () => {
  console.log("Escuchando al puerto", PORT);
});
