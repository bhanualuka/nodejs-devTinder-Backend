const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

//  post api for sending requests ==> Intrested or rejected (Basically we are intresting in users or ignoring them from our feed)
requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      const isAllowedStatus = ["interested", "ignored"];

      if (!isAllowedStatus.includes(status)) {
        return res
          .status(400)
          .send({ message: "Invalid Status type " + status });
      }

      /*  if (fromUserId.equals(toUserId)) {
        throw new Error("Cannot send Connection request to yourself");
      }
 */
      const isToUserIdExistInDB = await User.findById(toUserId);

      if (!isToUserIdExistInDB) {
        return res
          .status(400)
          .json({ message: " Sorry... Invalid User Request" });
      }

      // Existing connection request
      const existingConnectionRequestSend = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });

      if (existingConnectionRequestSend) {
        return res.status(400).send({
          message: "Request Cannot be sent",
        });
      }

      const connectionRequestSend = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequestSend.save();

      return res.json({ message: "Connection request sent seuccessfully" });
    } catch (err) {
      return res.status(400).send("ERROR :" + err.message);
    }
  }
);

// post api for accepting or rejecting the users(users who sent us request to be frd)
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;

      const { status, requestId } = req.params;

      // checking  status is valid or not ....

      const ALLOWED_STATUS = ["accepted", "rejected"];

      const isAllowedStatus = ALLOWED_STATUS.includes(status);

      if (!isAllowedStatus) {
        return res.status(400).json({ message: "Status not Allowed" });
      }

      const connectionRequestData = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequestData) {
        return res
          .status(400)
          .json({ message: "connection request not found" });
      }

      connectionRequestData.status = status;

      const data = await connectionRequestData.save();

      console.log(data);

      return res.json({
        message: "connection request" + status,
        data: data,
      });
    } catch (err) {
      return res.status(400).send("ERROR:" + err.message);
    }
  }
);

module.exports = requestRouter;
