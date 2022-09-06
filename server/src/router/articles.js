const express = require("express");
const router = express.Router();

// controller
const articles = require("../controller/articles");

// middleware
const validation = require("../middleware/validation");
const verifyJWT = require("../middleware/jwt");
const verification = require("../middleware/verification");
const image = require("../middleware/multer");

// end point
router.post(
  "/articles/add",
  verifyJWT,
  verification,
  image.single("imageUrl"),
  validation("ARTICLES"),
  articles.addArticles
);
router.get("/articles", verifyJWT, verification, articles.articles);
router.get(
  "/articles/articles/trends",
  verifyJWT,
  verification,
  articles.articlesTrends
);
router.get("/articles/trends", verifyJWT, verification, articles.getTrends);
router.post(
  "/articles/search",
  verifyJWT,
  verification,
  articles.articlesSearch
);
router.get(
  "/articles/featured",
  verifyJWT,
  verification,
  articles.FeaturedArticles
);
router.get("/articles/:id", verifyJWT, verification, articles.detailArticles);
router.delete(
  "/articles/:id",
  verifyJWT,
  verification,
  articles.deleteArticles
);
router.put(
  "/articles/:id",
  verifyJWT,
  verification,
  image.single("imageUrl"),
  validation("ARTICLES"),
  articles.updateArticles
);

module.exports = router;
