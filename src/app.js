const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./utils/adminAuth");

app.listen(8888, () => {
  console.log(
    "Server is succefully runningg... jai sai master jai bapuji maharaj"
  );
});

// for regex there is no need within the double quotes ==> syntax /characters without dobule quotes/
// query paramaters (?&...etc)

app.use("/admin", adminAuth);

app.get("/user/login", (req, res) => {
  res.send("user logined");
});

app.get("/user/data", userAuth, (req, res) => {
  console.log("user Authentication");
  res.send("user Data ");
});
app.get("/admin/getAllData", (req, res) => {
  console.log("Data fetched sucessfully");
  res.send("User data");
});

app.get("/admin/deleteData", (req, res) => {
  console.log("Data Deletd Succefully");
  res.send("Data delted ");
});
