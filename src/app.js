const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Sai master",
    lastName: "sai master",
    emailId: "saimaster@gmail.com",
    age: 0,
  });

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    console.log("User Not posted", err.message);
    res.status(400).send("Something went wrong");
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
