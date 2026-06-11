const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log(typeof req.body.age);
  res.send("hello world how are you");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
