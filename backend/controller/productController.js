const Product = require("../model/productSchema");
const path = require("path");

exports.addProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const image = req.file ? req.file.filename : "";

  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image,
    });
    await product.save();
    res.status(201).json({status:201,product:product});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.productList = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const query = req.query.q || "";
    const regex = new RegExp(query, "i");

    const products = await Product.find({
      $or: [{ name: regex }, { category: regex }],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error searching products", error });
  }
};
