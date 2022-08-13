const mongoose = require("mongoose");

async function databaseConnection() {
  try {
    await mongoose.connect(process.env.DATABASE_DEVELOPMENT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Stabil");
  } catch (error) {
    console.log("Database Tidak Stabil");
  }
}

module.exports = databaseConnection;
