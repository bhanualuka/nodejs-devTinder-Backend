require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cors = require("cors");
const cookieparser = require("cookie-parser");
// These Express.json() function converts  Json data into js objects.
// we can apply to all  routers using middleware given by expressjs
app.use(express.json());
app.use(cookieparser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

// Use CORS middleware with specified options
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://reactjs-dev-tinder-frontend-mma2.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

//
const PORT = process.env.PORT || 8084;

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
