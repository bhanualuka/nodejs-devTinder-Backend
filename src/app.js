const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Bhanuprakash",
    lastName: "Aluka",
    emailId: "alukabhanuprakash@gmail.com",
    age: 25,
  });

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    console.log("User Not posted", err.message);
    res.status(400).send("");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection Established...");
    app.listen(8888, () => {
      console.log(
        "Server is succefully runningg 8888... jai sai master jai bapuji maharaj"
      );
    });
  })
  .catch(() => {
    console.log("Database cannot be connect");
  });
