const { Router } = require("express");
const getProducts = require("./getProducts.routes.js");
const postProduct = require("./postProduct.routes.js");
const putProduct = require("./putProduct.routes.js");
const deleteProduct = require("./deleteProduct.routes.js");
const mercadopago = require("./mercadopago.routes.js");

const router = Router();

router.use("/", getProducts);
router.use("/", postProduct);
router.use("/", putProduct);
router.use("/", deleteProduct);
router.use("/", mercadopago);

module.exports = router;
