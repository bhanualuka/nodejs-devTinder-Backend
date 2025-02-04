const express = require("express");

const app = express();

app.listen(8888, () => {
  console.log(
    "Server is succefully runningg... jai sai master jai bapuji maharaj"
  );
});

// for regex there is no need within the double quotes ==> syntax /characters without dobule quotes/
// query paramaters`````
app.get("/user/:userId", (req, res) => {
  // query string data in databse
  console.log(req.params);

  res.send({
    firstName: "Bhanuprakash",
    age: 24,
    hobbies: ["Reading books", "playing cricket"],
  });
});

app.use("/hello", (req, res) => {
  res.send("jai sai master jai bapuji maharaj");
});

app.use("/update", (req, res) => {
  res.send("updated");
});

/* app.use("/", (req, res) => {
  res.send("Responded suceffuly");
}); */
