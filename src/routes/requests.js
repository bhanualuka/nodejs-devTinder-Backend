const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      const isAllowedStatus = ["interested", "rejected"];

      if (!isAllowedStatus.includes(status)) {
        res.status(400).send({ message: "Invalid Status type " + status });
      }

      /* if (fromUserId.equals(toUserId)) {
        throw new Error("Cannot send Connection request to yourself");
      }
 */
      const isToUserIdExistInDB = await User.findById(toUserId);

      if (!isToUserIdExistInDB) {
        return res
          .status(400)
          .json({ message: " Sorry... Invalid User Request" });
      }

      const existingConnectionRequestSend = await connectionRequest.findOne({
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

      const connectionRequestSend = new connectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequestSend.save();

      res.json({ message: "Connection request sent seuccessfully" });
    } catch (err) {
      res.status(400).send("ERROR :" + err.message);
    }
  }
);

module.exports = requestRouter;
