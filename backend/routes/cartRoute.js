const express = require("express");
const Cart = require("../controller/cartController");

const router = express.Router();

router.post("/add-item", Cart.addCartItem);

router.delete("/remove-item", Cart.deleteCartItem);
router.get("/:userIds", Cart.fetchCartItem);

module.exports = router;
