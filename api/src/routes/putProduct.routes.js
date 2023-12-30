const { Router } = require("express");
const Products = require("../models/Products.js");
const uploadImage = require("../utils/cloudinary.js");

const router = Router();

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

module.exports = router;
