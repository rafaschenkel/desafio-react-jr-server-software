const express = require("express");
const db = require("./api");

const productsRoutes = express.Router();

// Create
productsRoutes.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await db.products.findUnique({ where: { name } });
    if (product) return res.status(400).json("Item já cadastrado!");

    await db.products.create({ data: { name, price } });
    return res.status(201).json("Cadastro realizado com sucesso!");
  } catch (error) {
    res.status(500).json("Algo deu errado! Tente novamente!");
  }
});

// Read
productsRoutes.get("/", async (req, res) => {
  try {
    const products = await db.products.findMany();
    return res.json(products);
  } catch (error) {
    res.status(500).json("Algo deu errado! Tente novamente!");
  }
});

// Update
productsRoutes.put("/", async (req, res) => {
  try {
    const { name, price, id } = req.body;
    if (!id) return res.status(400).json("ID é obrigatório!");

    const product = await db.products.findUnique({ where: { id } });

    if (!product) return res.status(404).json("Produto não encontrado!");

    await db.products.update({
      where: { id },
      data: {
        name,
        price,
      },
    });
    return res.status(200).json("Produto alterado com sucesso!");
  } catch (error) {
    res.status(500).json("Algo deu errado! Tente novamente!");
  }
});

// Delete
productsRoutes.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json("ID é obrigatório!");

    const product = await db.products.findUnique({ where: { id } });

    if (!product) return res.status(404).json("Produto não encontrado!");

    await db.products.delete({
      where: { id },
    });
    return res.status(200).json("Produto removido com sucesso!");
  } catch (error) {
    res.status(500).json("Algo deu errado! Tente novamente!");
  }
});

//

module.exports = productsRoutes;
