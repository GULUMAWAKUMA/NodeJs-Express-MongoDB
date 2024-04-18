//header files
const express = require("express");
const app = express();
const ProductRouter = require("./routes/product.route.js");
const UserRouter = require("./routes/user.route.js");
const config = require("config");
const port = 2000;
// middleware
app.use(express.json());

// router for product
app.use("/api/products", ProductRouter);
// router for user
app.use("/api/users", UserRouter);
//database
require("./utility/db.js");

// configuration
// console.log(`Application name: ${config.get("name.name")}`);
// console.log(`Application customs conf: ${config.get("name.password")}`);
// database connection
app.listen(port, () => {
  console.log(`port listening on ${port}`);
});
