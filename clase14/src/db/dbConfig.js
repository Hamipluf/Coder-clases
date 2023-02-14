import mongoose from "mongoose";

const URI =
  "mongodb+srv://hamipluf:K_9KzACNVfT-X6e@cluster0.pmrma3u.mongodb.net/ecommerceCoder?retryWrites=true&w=majority";
mongoose.connect(URI, (error) => {
  if (error) {
    console.log("No se pudo conectar la base de datos");
  } else {
    console.log("DB conectada");
  }
});
