const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisEndtoEndYouRamRamSitaSitajai";

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bycrpt.genSalt(10);
    let securePassword = await bycrpt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error (email already exists)
        console.log("Error: Duplicate key (email already exists)");
        return res
          .status(400)
          .json({ success: false, error: "Email already exists" });
      }
      console.log("Error: " + error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

//Login User from here......

router.post(
  "/loginuser",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try again logging  with correct credentials." });
      }
      const pwdCompare = await bycrpt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try again logging  with correct credentials." });
      }
      const data = {
        user: { id: userData.id },
      };
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken });
    } catch (error) {
      console.log(error);
      res.json;
      ({ success: false });
    }
  }
);
module.exports = router;
