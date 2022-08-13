const mongoose = require("mongoose");
const shortId = require("shortid");

const auth = mongoose.Schema(
  {
    _id: { type: String, default: shortId.generate },
    imageUrl: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    refreshToken: { type: String },
    role: { type: String, default: "Writter" },
    verification: { type: Boolean, default: false },
    device: {
      os: { type: String, default: null },
      client: { type: String, default: null },
    },
    location: {
      ip: { type: String, default: null },
      countryCode: { type: String, default: null },
      countryName: { type: String, default: null },
      city: { type: String, default: null },
      region: { type: String, default: null },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("auth", auth);
