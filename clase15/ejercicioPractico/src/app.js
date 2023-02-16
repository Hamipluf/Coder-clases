import express from "express";
import { __dirname } from "./utils.js";
import { join } from "path";
import handlebars from "express-handlebars";

import coursesRoute from "./routes/courses.route.js";
import usersRoute from "./routes/users.route.js";
import viewRoute from "./routes/view.route.js";
import "./dao/dbConfig.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// motor de plantilla
const hbs = handlebars.create({
  defaultLayout: "main",
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"),
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("views", join(__dirname, "views"));
app.set("view engine", ".hbs");

//Rutas

app.use("/courses", coursesRoute);
app.use("/users", usersRoute);
app.use("/view", viewRoute);

// Server
app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto ${PORT}`);
});
