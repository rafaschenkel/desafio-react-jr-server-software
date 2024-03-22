const express = require("express");
const cors = require("cors");
const productsRoutes = require("./routes");

const app = express();
app.use(cors());

app.use(express.json());

app.use(productsRoutes);

app.listen(3333, () => {
  console.log("server up");
});
