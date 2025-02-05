const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

// These Express.json() function converts  Json data into js objects.
// we can apply to all  routers using middleware given by expressjs
app.use(express.json());

//  Api  posting the data into  database:
app.post("/signup", async (req, res) => {
  // created a new instance of the user model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    console.log("User Not posted", err.message);
    res.status(400).send("Validate Error:" + err.message);
  }
});

// Api to get the user data by user emailID:
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    console.log(userEmail);

    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.send("User Not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Someting went wrong", err.message);
  }
});

// Api to get the Feed data
app.get("/feed", async (req, res) => {
  try {
    const Feed = await User.find({});
    res.send(Feed);
  } catch (err) {
    res.status(400).send("Data not found");
  }
});

//  Api to delete the data
app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;
  await User.findByIdAndDelete(userId);
  res.send("User deleted successfully");
  try {
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Api to update(patch) the data
app.patch("/patch", async (req, res) => {
  // const userId = req.body.userId;
  const emailId = req.body.emailId;
  // console.log(emailId);

  const updatedData = req.body;

  try {
    // const updateUser = await User.findByIdAndUpdate(userId, updatedData);

    const updateUser = await User.findOneAndUpdate(
      { emailId: emailId },
      { $set: updatedData },
      {
        runValidators: true,
        returnDocument: "after",
      }
    );
    console.log(updateUser);
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

// Connected to database and server:
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
