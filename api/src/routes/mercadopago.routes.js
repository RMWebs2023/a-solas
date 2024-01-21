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
  let itemDescription = req.body.description;
  let itemPrice = Number(req.body.price);
  let itemQuantity = Number(req.body.quantity);

  let message = `Hola A Solas,

Te paso el resumen de mi pedido:
  
 Detalles de la compra:
 - Productos: ${itemDescription}
 - Cantidad total de productos: ${itemQuantity}
 - Precio final: $${itemPrice}
  
 Espero tu respuesta para confirmar y organizar el retiro/envío de mi pedido`;

  let whatsappURL = `https://wa.me/5493515061506/?text=${encodeURIComponent(
    message
  )}`;

  let preference = {
    items: [
      {
        title: itemDescription,
        unit_price: itemPrice,
        quantity: itemQuantity,
      },
    ],
    back_urls: {
      success: whatsappURL,
      failure: "https://asolas.com.ar",
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
