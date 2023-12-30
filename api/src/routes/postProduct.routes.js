const { Router } = require("express");
const Products = require("../models/Products.js");
const uploadImage = require("../utils/cloudinary.js");

const router = Router();

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

module.exports = router;
