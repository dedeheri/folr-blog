const fs = require("fs");
const path = require("path");

function deleteImage(props) {
  const imagePath = path.join(__dirname, "../../", props);
  fs.unlinkSync(imagePath);
}

module.exports = deleteImage;
