import mongoose from "mongoose";

// El producto que se ingrese va a necesiar si o si de las porpiedades
// que se detallan en el schema
const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  price: {
    type: Number,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
});

export const porductsModel = mongoose.model("Products", productsSchema);
