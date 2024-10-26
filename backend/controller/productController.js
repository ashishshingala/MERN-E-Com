
const Product = require('../model/productSchema');
const path = require('path');


exports.addProduct = async (req, res) => {
    
  const { name, description, price, category, stock } = req.body;
  const image = req.file ? req.file.filename : '';

  try {
    const product = new Product({ name, description, price, category, stock, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.productList =  async (req, res) => {
    try {
        const products = await Product.find();
        console.log('products', products)
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



