const mongoose = require("mongoose");
const url = "mongodb://localhost:27017";
const databaseName = "test";
const port = 2000;
mongoose
  .connect(url + "/" + databaseName)
  .then(() => {
    console.log("Connected to database " + databaseName);
  })
  .catch((err) => {
    console.error("Error connecting to database " + databaseName);
  });
