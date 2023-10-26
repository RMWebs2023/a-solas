const { Router } = require("express");
const mercadopago = require("mercadopago");
const Products = require("../models/Products.js");
const uploadImage = require("../utils/cloudinary.js");
require("dotenv").config();

const router = Router();

// token de MercadoPago
mercadopago.configure({
  access_token: process.env.TOKEN_MP,
});

// ruta para recibir información de los productos a pagar
router.post("/create_preference", (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "https://rmwebs2023.github.io/a-solas/#/home",
      failure: "https://rmwebs2023.github.io/a-solas/#/home",
      pending: "",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

// ruta que llama a todos los productos de la bdd
router.get("/", async (req, res) => {
  await Products.find()
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});

// ruta que crea un producto
router.post("/", async (req, res) => {
  const product = Products(req.body);

  if (req.files?.image) {
    const result = await uploadImage(req.files.image.tempFilePath);
    product.image = {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } else {
    console.log("Missing image to load");
  }

  await product
    .save()
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});

// ruta que modifica un producto
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProduct = {};

  if (req.files?.image) {
    const result = await uploadImage(req.files.image.tempFilePath);
    updatedProduct.image = {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  }

  Object.keys(req.body).forEach((key) => {
    if (
      req.body[key] !== undefined &&
      req.body[key] !== null &&
      req.body[key] !== ""
    ) {
      updatedProduct[key] = req.body[key];
    }
  });

  try {
    if (Object.keys(updatedProduct).length > 0) {
      const result = await Products.findByIdAndUpdate(id, updatedProduct, {
        new: true,
      });
      res.status(200).json(result);
    } else {
      res.status(400).json({
        message: "No valid data will be provided to update.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ruta que elimina un producto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Products.findByIdAndDelete(id)
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});

module.exports = router;
