import { Schema, model, mongoose } from "mongoose";
import { productModel } from "./product.model.js";

const cartSchema = new Schema({
  code: { type: String, required: false }, 
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref:'Products' },
    quantity: { type: Number, require: true, default: 1 }
  }]
});  
  const cartModel = model("carts", cartSchema);
  
  export { cartModel };