const mongoose = require("mongoose");
const shortid = require("shortid");

const category = mongoose.Schema(
  {
    _id: { type: String, default: shortid.generate },
    category: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", category);
