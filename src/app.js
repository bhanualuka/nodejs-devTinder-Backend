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

app.use(
  cors({
    origin: "https://reactjs-dev-tinder-frontend-tb5w-1oud9dky5.vercel.app",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

//
const PORT = process.env.PORT || 4000;

// Connected to database and server:
// console.log(PORT);
connectDB()
  .then(() => {
    console.log("Database connection Established...");
    app.listen(PORT, () => {
      console.log("Server is succefully runningg 8888...");
    });
  })
  .catch(() => {
    console.log("Database cannot be connect");
  });
