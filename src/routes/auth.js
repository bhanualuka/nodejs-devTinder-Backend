const express = require("express");
const authRouter = express.Router(); //--> Bundling routers
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignup } = require("../utils/validate");

authRouter.post("/signup", async (req, res) => {
  // created a new instance of the user model
  const {
    firstName,
    lastName,
    password,
    emailId,
    skills,
    gendar,
    photoURL,
    age,
  } = req.body;

  try {
    validateSignup(req);
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: passwordHash,
      photoURL: photoURL,
      age: age,
      gendar: gendar,
      skills: skills,
    });

    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "emailId",
      "password",
      "photoURL",
      "age",
      "gendar",
      "skills",
    ];

    const isAllowedUpdates = Object.keys(req.body).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isAllowedUpdates) {
      throw new Error("Cannot add extra fields");
    } else {
      await user.save();
      res.send("User Added Successfully");
    }
  } catch (err) {
    console.log("Post Unsucessfull", err.message);
    res.status(400).send("Validate Error:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const ALLOWED_LOGIN = ["emailId", "password"];

    const isAllowedUpdates = Object.keys(req.body).every((k) =>
      ALLOWED_LOGIN.includes(k)
    );

    const { emailId, password } = req.body;
    if (isAllowedUpdates) {
      const user = await User.findOne({ emailId: emailId });

      if (!user) {
        throw new Error("Invalid Credentials");
      } else {
        const isPassowrdValid = await user.ValidatePassword(password);

        if (isPassowrdValid) {
          const token = await user.getJWT();

          res.cookie("token", token);
          console.log(token);

          res.send("User LoggedIN Successfully");
        } else {
          throw new Error("Invalid Credentials");
        }
      }
    } else {
      throw new Error("Only email and password should be enter");
    }
  } catch (err) {
    res.status(400).send("ERROR:  " + err.message);
  }
});

module.exports = authRouter;
