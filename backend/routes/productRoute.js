const express = require("express");
const multer = require("multer");
const Product = require("../controller/productController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "views");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.originalname.split(".")[1]
    );
  },
});
const upload = multer({ storage: storage });

router.post("/add-product", upload.single("image"), Product.addProduct);
router.get("/get-product", Product.productList);
router.get("/search-products", Product.searchProducts);

module.exports = router;
