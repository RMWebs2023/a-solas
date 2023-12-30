const { Router } = require("express");
const mercadopago = require("mercadopago");
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

module.exports = router;
