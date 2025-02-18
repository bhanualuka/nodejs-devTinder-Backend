const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env);
console.log(process.env.MONGO_URI, "g9fg");
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
