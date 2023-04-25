import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export const cartsModel = mongoose.model("Carts", cartsSchema);
