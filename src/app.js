const express = require("express");
const { connectDB } = require("./config/database");
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
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
