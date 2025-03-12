require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cors = require("cors");
const cookieparser = require("cookie-parser");
app.use(express.json());
app.use(cookieparser());

app.use(
  cors({
    origin: [
      "https://reactjs-dev-tinder-frontend-tb5w.vercel.app",
      "http://localhost:5176",
      "https://reactjs-dev-tinder-frontend-auki-37wujp6q0.vercel.app",
      "https://reactjs-dev-tinder-fr-git-958751-bhanu-prakash-aluka-s-projects.vercel.app",
      "https://reactjs-dev-tinder-frontend-auki-37wujp6q0.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204); // No Content (successful preflight response)
});

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

//
const PORT = process.env.PORT || 8094;

// Connected to database and server:
// console.log(PORT);
connectDB()
  .then(() => {
    console.log("Database connection Established...");
  })
  .catch(() => {
    console.log("Database cannot be connect");
  });

app.listen(PORT, () => {
  console.log("Server is succefully runningg " + PORT);
});
