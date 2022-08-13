const express = require("express");
const router = express.Router();

// controller
const category = require("../controller/category");

// middleware
const validation = require("../middleware/validation");
const verifyJWT = require("../middleware/jwt");
const verification = require("../middleware/verification");

// endpoint
router.post(
  "/category/add",
  verifyJWT,
  verification,
  validation("CATEGORY"),
  category.addCategory
);
router.get("/category", verifyJWT, verification, category.getCategory);
router.get("/category/:id", verifyJWT, verification, category.detailCategory);
router.put(
  "/category/:id",
  verifyJWT,
  verification,
  validation("CATEGORY"),
  category.updateCategory
);
router.delete(
  "/category/:id",
  verifyJWT,
  verification,
  category.deleteCategory
);

module.exports = router;
