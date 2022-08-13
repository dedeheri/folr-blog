const multer = require("multer");

function handleErrorMulter(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    return res
      .status(500)
      .json({ multer: `Multer uploading error ${err.message}` });
  } else if (err) {
    if (err.name === "ExtensionError") {
      return res.status(500).json({ multer: err.name });
    } else {
      return res
        .status(500)
        .json({ multer: `Multer uploading error ${err.message}` });
    }
  }
}

module.exports = handleErrorMulter;
