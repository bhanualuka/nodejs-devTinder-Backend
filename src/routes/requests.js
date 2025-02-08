const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");

requestRouter.post("/SendConnectionRequest", userAuth, async (req, res) => {
  console.log("Connection send successfully");

  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }
    res.send("Connection request sended successfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

module.exports = requestRouter;
