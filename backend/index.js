const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const AuthMiddleware = require("./middleware/authMiddleware");
require("dotenv").config();
require("./database/index");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/views"));

app.use("/api/user", userRoute);
app.use("/api/product", AuthMiddleware, productRoute);
app.use("/api/cart", AuthMiddleware, cartRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
