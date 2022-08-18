const multer = require("multer");

// storege
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./assets/image");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname.match(/\..*$/)[0]);
  },
});

const image = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
      const err = new Error(
        "Hanya mendukung format gambar .png, .jpg and .jpeg"
      );
      err.name = "ExtensionError";
      return callback(err);
    }
  },
});

module.exports = image;
