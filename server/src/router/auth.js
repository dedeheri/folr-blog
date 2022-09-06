const express = require("express");
const router = express.Router();

// contoller
const auth = require("../controller/auth");

// middleware
const validation = require("../middleware/validation");
const image = require("../middleware/multer");
const verifyJWT = require("../middleware/jwt");
const verification = require("../middleware/verification");
// end point
router.post(
  "/registration",
  image.single("imageUrl"),
  validation("REGISTRATION"),
  auth.registration
);
router.post("/login", validation("LOGIN"), auth.login);
router.get("/user", verifyJWT, verification, auth.user);
router.get("/logout", verifyJWT, auth.logout);

module.exports = router;
