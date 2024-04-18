const express = require("express");
const router = express.Router();
const {
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  createProduct,
} = require("../controller/product.controller.js");

router.get("/get/:id", getProduct);
router.get("/getAll", getProducts);
router.post("/create", createProduct);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);
module.exports = router;
