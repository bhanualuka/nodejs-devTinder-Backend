const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { ValidateProfileEditData } = require("../utils/validate");
const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  const user = req.user;

  try {
    if (!user) {
      throw new Error("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// profile editing (except email, password)
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!ValidateProfileEditData(req)) {
      throw new Error("Invalid Credentials");
    }

    loggedInUser = req.user;

    Object.keys(req.body).every((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: ` ${loggedInUser.firstName} User Edited Successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// Forget Password  editing
profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
  const isValidPassword = req.body.password;
  try {
    if (!validator.isStrongPassword(isValidPassword)) {
      throw new Error("Password is invalid");
    } else {
      // creating passwordhash for new edit password

      const editPasswordHash = await bcrypt.hash(isValidPassword, 15);

      // updating passwodhash with editPasswordHas

      console.log(req.user.password);
      req.user.password = editPasswordHash;

      const newDocument = await req.user.save();

      console.log(req.user);

      res.json({
        message: `Password edited successfully ${isValidPassword}`,
        data: newDocument,
      });
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});
module.exports = profileRouter;
