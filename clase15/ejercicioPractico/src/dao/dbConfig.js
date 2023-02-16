import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const URI = process.env.URI;

mongoose.connect(URI, (error) => {
  if (error) {
    console.log("no se pudo conectar a la base de datos", error);
  } else {
    console.log("DB connected");
  }
});
