const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  try {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send("please login");
    }
    const decoded = await jwt.verify(token, "DEV@Tinder123");

    const { _id } = decoded;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User Not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
};

module.exports = { userAuth };
