const jsonwebtoken = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(404).json({ message: "Akses dicekal" });
  }
  try {
    const jwt = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN);
    req.decode = jwt;
    next();
  } catch (error) {
    return res.status(422).json({ message: "Harap masuk untuk melanjutkan" });
  }
}

module.exports = verifyJWT;
