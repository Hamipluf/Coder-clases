import express from "express";

// importar los archivos de rutas
const app = express();

//creamos dirname ( si trabajamos con type: module es necesario si trabajamos con type:comonjs ya esta seteado)
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

// midlewere
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // para que entienda los datos al entrar
app.use(express.static(__dirname + "public"));
// siempre que trabajamos con expres se configura los dos midlewere
// app.use("/api/users", usersRouter);
// app.use("/api/pets", petsRouter);

app.listen(3000, () => {
  console.log("Escuchando al puerto", 3000);
});
