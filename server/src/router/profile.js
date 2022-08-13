const express = require("express");
const router = express.Router();

// controller
const profile = require("../controller/profile");

// middleware
const validation = require("../middleware/validation");
const verifyJWT = require("../middleware/jwt");
const verification = require("../middleware/verification");
const image = require("../middleware/multer");

// end point

router.get("/user/:id/:name", verifyJWT, verification, profile.getUsers);
router.get(
  "/user/articles/:id/:name",
  verifyJWT,
  verification,
  profile.getArticlesByUsers
);
router.get(
  "/user/trend/:id/:name",
  verifyJWT,
  verification,
  profile.getArticlesTrends
);
router.get("/user/history/", verifyJWT, verification, profile.getHistoryLogin);

module.exports = router;
