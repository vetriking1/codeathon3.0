import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("seller", "username email phoneNumber")
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// Get products by seller ID
router.get("/seller/:sellerId", async (req, res) => {
  try {
    const products = await Product.find({ seller: req.params.sellerId })
      .populate("seller", "username email phoneNumber")
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching seller products",
      error: error.message,
    });
  }
});

// Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "username email phoneNumber"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
});

// Create new product
router.post("/", async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      seller: req.body.seller,
    });
    await product.save();

    // Populate seller details before sending response
    await product.populate("seller", "username email phoneNumber");
    res.status(201).json(product);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating product", error: error.message });
  }
});

// Update product
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user is the owner of the product
    if (product.seller.toString() !== req.body.seller) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this product" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    ).populate("seller", "username email phoneNumber");
    res.json(updatedProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating product", error: error.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user is the owner of the product
    if (product.seller.toString() !== req.body.seller) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this product" });
    }

    await product.remove();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
});

export default router;
