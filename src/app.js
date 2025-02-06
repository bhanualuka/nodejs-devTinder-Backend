const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

const { validateSignup } = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
// These Express.json() function converts  Json data into js objects.
// we can apply to all  routers using middleware given by expressjs
app.use(express.json());
app.use(cookieparser());

//  Api  posting the data into  database:
app.post("/signup", async (req, res) => {
  // created a new instance of the user model
  const {
    firstName,
    lastName,
    password,
    emailId,
    skills,
    gendar,
    photoURL,
    age,
  } = req.body;

  try {
    validateSignup(req);
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: passwordHash,
      photoURL: photoURL,
      age: age,
      gendar: gendar,
      skills: skills,
    });

    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "emailId",
      "password",
      "photoURL",
      "age",
      "gendar",
      "skills",
    ];

    const isAllowedUpdates = Object.keys(req.body).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isAllowedUpdates) {
      throw new Error("Cannot add extra fields");
    } else {
      await user.save();
      res.send("User Added Successfully");
    }
  } catch (err) {
    console.log("Post Unsucessfull", err.message);
    res.status(400).send("Validate Error:" + err.message);
  }
});

// post Api to login
app.post("/login", async (req, res) => {
  try {
    const ALLOWED_LOGIN = ["emailId", "password"];

    const isAllowedUpdates = Object.keys(req.body).every((k) =>
      ALLOWED_LOGIN.includes(k)
    );

    const { emailId, password } = req.body;
    if (isAllowedUpdates) {
      const user = await User.findOne({ emailId: emailId });

      if (!user) {
        throw new Error("Invalid Credentials");
      } else {
        const isPassowrdValid = await bcrypt.compare(password, user.password);

        if (isPassowrdValid) {
          const token = await jwt.sign(
            { _id: user._id.toString() },
            "DEV@Tinder123"
          );

          res.cookie("token", token);
          console.log(token);

          res.send("User LoggedIN Successfully");
        } else {
          throw new Error("Invalid Credentials");
        }
      }
    } else {
      throw new Error("Only email and password should be enter");
    }
  } catch (err) {
    res.status(400).send("ERROR:  " + err.message);
  }
});

//  get Api to profile
app.get("/profile", async (req, res) => {
  const UserCookie = req.cookies;
  const { token } = UserCookie;

  console.log(token);

  const decoded = await jwt.verify(token, "DEV@Tinder123");
  const { _id } = decoded;

  const user = await User.findById({ _id: _id });
  res.send(user);

  console.log(token);
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
app.patch("/patch/:userId", async (req, res) => {
  const userId = req.params.userId;
  // const emailId = req.body.emailId;
  // console.log(emailId);

  const updatedData = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(userId, updatedData, {
      returnDocument: "after",
      runValidators: true,
    });

    const ALLOWED_UPDATES = ["photoURL", "age", "skills"];

    const isAllowedUpdates = Object.keys(req.body).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isAllowedUpdates) {
      throw new Error("user cannot be updates certain fields");
    }

    /*   const updateUser = await User.findOneAndUpdate(
      { emailId: emailId },
      { $set: updatedData },
      {
        runValidators: true,
        returnDocument: "after",
      }
    ); */
    console.log(updateUser);
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(400).send("UPATE FAILED:" + err.message);
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
