const express = require("express");
const productsRoutes = require("./routes");

const app = express();

app.use(express.json());

app.use(productsRoutes);

app.listen(3333, () => {
  console.log("server up");
});
