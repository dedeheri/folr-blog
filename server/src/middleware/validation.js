const { body } = require("express-validator");

function validation(props) {
  switch (props) {
    case "REGISTRATION": {
      return [
        body("fullName")
          .notEmpty()
          .withMessage("Nama Lengkap tidak boleh kosong"),
        body("email")
          .notEmpty()
          .withMessage("Email tidak boleh kosong")
          .isEmail()
          .withMessage("Format e-mail tidak didukng"),
        body("privacyPolicies").custom((value, { req }) => {
          if (req.body.privacyPolicies === "false") {
            throw new Error(
              "Anda Harus setuju dengan Syarat dan Kebijakan Privasi kami"
            );
          }
          return true;
        }),
        body("password")
          .notEmpty()
          .withMessage("Kata sandi tidak boleh kosong")
          .isLength({ min: 6 })
          .withMessage("Kata sandi minimal 6 karakter atau lebih"),
        body("imageUrl").custom((value, { req }) => {
          if (!req.file) {
            throw new Error("Foto profil tidak boleh kosong");
          }
          return true;
        }),
      ];
    }

    case "LOGIN": {
      return [
        body("email")
          .notEmpty()
          .withMessage("Email tidak boleh kosong")
          .isEmail()
          .withMessage("Format e-mail tidak didukng"),
        body("password")
          .notEmpty()
          .withMessage("Kata sandi tidak boleh kosong")
          .isLength({ min: 6 })
          .withMessage("Kata sandi minimal 6 karakter atau lebih"),
      ];
    }

    case "CATEGORY": {
      return [
        body("category").notEmpty().withMessage("Kategori tidak boleh kosong"),
      ];
    }

    case "ARTICLES": {
      return [
        body("title").notEmpty().withMessage("Title tidak boleh kosong"),
        body("description")
          .notEmpty()
          .withMessage("Deskripsi tidak boleh kosong"),
        body("description")
          .notEmpty()
          .withMessage("Deskripsi tidak boleh kosong"),
        body("category").notEmpty().withMessage("Kategori tidak boleh kosong"),
        body("reference")
          .notEmpty()
          .withMessage("Referensi tidak boleh kosong"),
        body("imageUrlCredit")
          .notEmpty()
          .withMessage("Sumber gambar tidak boleh kosong"),
        body("imageUrl").custom((value, { req }) => {
          if (!req.file) {
            throw new Error("Gambar tidak boleh kosong");
          }
          return true;
        }),
      ];
    }

    default:
      return props;
  }
}

module.exports = validation;
