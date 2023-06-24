const { Router } = require("express");
const products = require("../models/Products.js");

const router = Router();

router.get("/", (req, res) => {
  products
    .find()
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});

router.post("/", (req, res) => {
  const product = products(req.body);
  product
    .save()
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});

module.exports = router;
