const { Router } = require("express");
const Products = require("../models/Products.js");

const router = Router();

// ruta que llama a todos los productos de la base de datos
router.get("/", async (req, res) => {
  try {
    const data = await Products.find();
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
