const express = require("express");

const app = express();

app.listen(8888, () => {
  console.log(
    "Server is succefully runningg... jai sai master jai bapuji maharaj"
  );
});

app.use("/hello/2", (req, res) => {
  res.send("response sended");
});

app.use("/hello", (req, res) => {
  res.send("jai sai master jai bapuji maharaj");
});

app.use("/update", (req, res) => {
  res.send("updated");
});

app.use("/", (req, res) => {
  res.send("Responded suceffuly");
});
