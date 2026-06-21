const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const upload = require("../middleware/multer");

router.post("/add", adminAuth, upload.single("image"), addProduct);
router.put("/update", adminAuth, upload.single("image"), updateProduct);
router.get("/list", getProducts);
router.delete("/delete", adminAuth, deleteProduct);

module.exports = router;
