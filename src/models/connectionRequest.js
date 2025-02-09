const mongoose = require("mongoose");

const { Schema } = mongoose;

const User = require("../models/user");

const connectionRequestSchema = new Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User,
  },

  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User,
  },

  status: {
    type: String,
    enum: {
      values: ["interested", "ignored", "accepted", "rejected"],
      message: `{VALUE} is  incorrect status type `,
    },
  },
});

// indexes (Compound index)

connectionRequestSchema.index({ fromUserId: 1 }, { toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send Connection request to yourself");
  }
  next();
});

module.exports = mongoose.model("connectionSchema", connectionRequestSchema);
