const Product = require("../models/productModel");

// Added

const addProduct = async (req, res) => {
  try {
    //  console.log("BODY:", req.body);
    // console.log("FILES:", req.files);
    // console.log("FILE:", req.file);
    const { name, description, rentPrice, category } = req.body;

    const imageUrl = `/uploads/${req.file.filename}`;

    const product = await Product.create({
      name,
      description,
      rentPrice,
      category,
      image: imageUrl,
    });

    res.json({
      success: true,
      message: "Product Added",
      product,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      console: console.log(error),
    });
  }
};

// listed
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// deleted
const updateProduct = async (req, res) => {
  try {
    const { id, name, description, rentPrice, category } = req.body;
    const updateData = {
      name,
      description,
      rentPrice,
      category,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product Updated",
      product,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      console: console.log(error),
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;

    await Product.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addProduct, getProducts, deleteProduct, updateProduct };
