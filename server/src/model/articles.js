const mongoose = require("mongoose");
const shortId = require("shortid");

const articles = mongoose.Schema(
  {
    _id: { type: String, default: shortId.generate },
    imageUrl: { type: String, required: true, trim: true },
    imageUrlCredit: { type: String, trim: true },
    authourId: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },
    view: { type: Number, default: 0 },
    reference: { type: Array, default: null },
    hastag: { type: Array, default: null },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("articles", articles);
