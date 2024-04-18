const Product = require("../models/product.model.js");

const getProducts = async (req, res) => {
  await Product.find({}).then((result) => {
    res.status(200).json(result);
  });
};

const getProduct = async (req, res) => {
  try {
    await Product.findById(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    await Product.create(req.body).then((result) => {
      res.status(200).json(result);
    });
  } catch (e) {
    console.error("something going wrong ");
    res.status(500).json({ message: e.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body).then((result) => {
      res.status(200).json(result);
      Product.findById(req.params.id).then((data) => {
        res.status(200).json(data);
      });
    });
  } catch (e) {
    console.error("something going wrong ");
    res.status(500).json({ message: e.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id).then(() => {
      res.status(200).json({ message: "Product deleted successfully" });
    });
  } catch (e) {
    console.error("something going wrong ");
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  createProduct,
};
