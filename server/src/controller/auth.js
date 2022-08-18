// library
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const axios = require("axios");
const detector = require("../utils/detector");

// utlis
const deletedImage = require("../utils/deleteImage");

// models
const authModel = require("../model/auth");
const authHistoryModel = require("../model/authHistory");
const titleCase = require("../utils/case");
// token
function generetedAccessToken(props, expires) {
  return jwt.sign({ id: props }, process.env.ACCESS_TOKEN, {
    expiresIn: expires,
  });
}
function generetedRefreshToken(props) {
  return jwt.sign({ id: props }, process.env.REFRESH_TOKEN);
}

async function registration(req, res) {
  const imageUrl = req.file;
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;

  // validation body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (imageUrl?.path) deletedImage(imageUrl?.path);
    return res.status(422).json({ validation: errors.mapped() });
  }

  // email sudah ter-registration
  const auth = await authModel.findOne({ email });
  if (auth) {
    if (imageUrl?.path) deletedImage(imageUrl?.path);
    return res.status(422).json({ message: "E-mail sudah terdaftar" });
  }

  // generet password
  const salt = 10;
  const passwordGenereted = await bcryptjs.hash(password, salt);

  // capital

  // callback
  try {
    const ip = await axios.get("https://api.ipify.org?format=json");
    const location = await axios.get(
      `https://api.ipfind.com/?ip=${ip.data.ip}&auth=614829d3-066a-4dd7-aaec-6a27bb82a58f`
    );
    const device = detector();

    const auth = await authModel({
      imageUrl: imageUrl?.path,
      fullName: titleCase(fullName),
      email: email,
      password: passwordGenereted,
      device: {
        os: device.os.name,
        client: device.client.name,
      },
      location: {
        ip: location.data.ip_address,
        countryCode: location.data.country_code,
        countryName: location.data.country,
        region: location.data.region,
        city: location.data.city,
      },
    }).save();

    // put refresh token
    await authModel.findByIdAndUpdate(
      { _id: auth._id },
      { refreshToken: generetedRefreshToken(auth._id) },
      { new: true }
    );

    return res.status(200).json({ message: `Email ${email} berhasil dibuat` });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi Kesalahan" });
  }
}

async function login(req, res) {
  const email = req.body.email;
  const plantPassword = req.body.password;
  const rememberMe = req.body.rememberMe;

  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ validation: errors.mapped() });
  }

  // akun tidak tersedia
  const auth = await authModel.findOne({ email });
  if (!auth) {
    return res.status(404).send({
      message: {
        email: "Email belum terdaftar",
      },
    });
  }

  // kata sandi salah
  const comparePassword = await bcryptjs.compare(plantPassword, auth.password);
  if (!comparePassword) {
    return res.status(422).json({
      message: {
        password: "Kata sandi salah",
      },
    });
  }

  const ip = await axios.get("https://api.ipify.org?format=json");
  const location = await axios.get(
    `https://api.ipfind.com/?ip=${ip.data.ip}&auth=614829d3-066a-4dd7-aaec-6a27bb82a58f`
  );
  const device = detector();

  try {
    if (rememberMe) {
      const time = {
        maxAge: 30 * 24 * 3600000,
      };
      const token = generetedAccessToken(auth._id, "30d");
      res.cookie("__token", token, time);
      res.cookie("isLogin", true, time);
      res.cookie("lang", "id", time);
      res.cookie("theme", "dark", time);
    } else {
      const time = {
        maxAge: 1 * 24 * 3600000,
      };
      const token = generetedAccessToken(auth._id, "1d");
      res.cookie("__token", token, time);
      res.cookie("isLogin", true, time);
      res.cookie("lang", "id", time);
      res.cookie("theme", "dark", time);
    }

    const { password, __v, imageUrl, ...rest } = auth._doc;

    // upate location
    await authModel.findByIdAndUpdate(
      { _id: auth._id },
      {
        device: {
          os: device.os.name,
          client: device.client.name,
        },
        location: {
          ip: location.data.ip_address,
          countryCode: location.data.country_code,
          countryName: location.data.country,
          region: location.data.region,
          city: location.data.city,
        },
      }
    );
    // save auth history
    await authHistoryModel({
      authId: auth._id,
      device: {
        os: device.os.name,
        client: device.client.name,
      },
      location: {
        ip: location.data.ip_address,
        countryCode: location.data.country_code,
        countryName: location.data.country,
        region: location.data.region,
        city: location.data.city,
      },
    }).save();

    return res.status(200).json({
      user: rest,
      access_token: rememberMe
        ? generetedAccessToken(auth._id, "30d")
        : generetedAccessToken(auth._id, "1d"),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan" });
  }
}

async function user(req, res) {
  const id = req.decode.id;

  const auth = await authModel.findOne({ _id: id });
  const { password, __v, refreshToken, ...rest } = auth._doc;

  try {
    return res.status(200).json({ user: rest });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi Kesalahan" });
  }
}

module.exports = { registration, login, user };
