const { Router } = require("express");
const Products = require("../models/Products.js");

const router = Router();

// ruta que elimina un producto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Products.findByIdAndDelete(id)
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});

module.exports = router;
