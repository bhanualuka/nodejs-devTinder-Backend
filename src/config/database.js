const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://alukabhanuprakash:PaC9St1qHi1H7my7@nodeproject.p30iw.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };
