const multer = require("multer");

function handleErrorMulter(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    res
      .status(500)
      .send({ error: { multer: `Multer uploading error: ${err.message}` } })
      .end();
    return;
  } else if (err) {
    // An unknown error occurred when uploading.
    if (err.name == "ExtensionError") {
      res
        .status(413)
        .send({ error: { multer: err.message } })
        .end();
    } else {
      res
        .status(500)
        .send({ error: { multer: `unknown uploading error: ${err.message}` } })
        .end();
    }
    return;
  }
}

module.exports = handleErrorMulter;
