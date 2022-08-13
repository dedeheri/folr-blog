const authModel = require("../model/auth");

async function verification(req, res, next) {
  const id = req.decode.id;
  const auth = await authModel.findOne({ _id: id });

  if (auth.verification) {
    next();
  } else {
    return res.status(403).json({ message: "E-mail belum terverifikasi" });
  }
}

module.exports = verification;
