const multer = require("multer");

// storege
const storege = multer.diskStorage({
  destination: function (req, res, callback) {
    callback(null, "./assets/");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname.match(/\..*$/)[0]);
  },
});

const image = multer({
  storage: storege,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, callback) {
    function fileType(file) {
      if (file.mimetype === "image/png") {
        return true;
      } else if (file.mimetype === "image/jpg") {
        return true;
      } else if (file.mimetype === "image/jpeg") {
        return true;
      } else if (file.mimetype === "image/gif") {
        return true;
      } else {
        return false;
      }
    }

    if (fileType(file)) {
      callback(null, true);
    } else {
      callback(null, false);
      const err = new Error(
        "Hanya mendukung format gambar png, jpeg, jpg dan gif"
      );
      err.name = "ExtensionError";
      return callback(err);
    }
  },
});

module.exports = image;
