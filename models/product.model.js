const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "Please enter the product name"],
    },
    quantity: {
      type: "number",
      required: true,
      default: 0,
    },
    price: {
      type: "string",
      required: true,
      default: 0,
    },
    image: {
      type: "string",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
// const p = new Product({
//   name: "<test>",
//   quantity: 100,
//   price: 1000,
//   image: "test",
// });
// p.save();
module.exports = Product;
