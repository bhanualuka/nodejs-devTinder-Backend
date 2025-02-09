const mongoose = require("mongoose");

const { Schema } = mongoose;

const connectionRequestSchema = new Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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
});

module.exports = mongoose.model("connectionSchema", connectionRequestSchema);
