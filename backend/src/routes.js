const express = require("express");
const db = require("./api");

const productsRoutes = express.Router();

// Create
productsRoutes.post("/", async (req, res) => {
  try {
    const { descricao, preco, data_cadastro } = req.body;
    const product = await db.products.findUnique({ where: { descricao } });
    if (product) return res.status(400).json("Item já cadastrado!");

    await db.products.create({ data: { descricao, preco, data_cadastro } });
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
    const { descricao, preco, codigo } = req.body;
    if (!codigo) return res.status(400).json("Codigo é obrigatório!");

    const product = await db.products.findUnique({ where: { codigo } });

    if (!product) return res.status(404).json("Produto não encontrado!");

    await db.products.update({
      where: { codigo },
      data: {
        descricao,
        preco,
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
    const { codigo } = req.body;
    if (!codigo) return res.status(400).json("Codigo é obrigatório!");

    const product = await db.products.findUnique({ where: { codigo } });

    if (!product) return res.status(404).json("Produto não encontrado!");

    await db.products.delete({
      where: { codigo },
    });
    return res.status(200).json("Produto removido com sucesso!");
  } catch (error) {
    res.status(500).json("Algo deu errado! Tente novamente!");
  }
});

//

module.exports = productsRoutes;
