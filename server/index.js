require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const mongoose = require("mongoose");

// src
const databaseConnection = require("./src/database");
const handleErrorMulter = require("./src/middleware/multer/error");

// router
const auth = require("./src/router/auth");
const category = require("./src/router/category");
const articles = require("./src/router/articles");
const profile = require("./src/router/profile");

function start() {
  const app = express();

  // middleware
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

  // database
  databaseConnection();

  // static
  app.use("/assets/", express.static(path.join(__dirname, "assets/")));

  // handle error multer
  app.use(handleErrorMulter);

  // endpoint
  app.use("/api/v1/auth", auth);
  app.use("/api/v1", category);
  app.use("/api/v1", articles);
  app.use("/api/v1", profile);

  // listen
  mongoose.connection.once("open", () => {
    app.listen(process.env.PORT, () => console.log("Server berjalan stabil"));
  });
}

start();
