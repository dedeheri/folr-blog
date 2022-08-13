const mongoose = require("mongoose");
const shortId = require("shortid");

const authHistory = mongoose.Schema(
  {
    _id: { type: String, default: shortId.generate },
    authId: { type: String },
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

module.exports = mongoose.model("authHistory", authHistory);
