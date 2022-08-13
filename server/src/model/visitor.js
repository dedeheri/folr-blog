const mongoose = require("mongoose");
const shortId = require("shortid");

const vistor = mongoose.Schema(
  {
    _id: { type: String, default: shortId.generate },
    visitorId: { type: String, default: null },
    articlesId: {
      type: Array,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("visitor", vistor);
