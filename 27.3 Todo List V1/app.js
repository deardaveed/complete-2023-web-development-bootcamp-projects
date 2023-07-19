const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function (req, res) {
  res.send("hello");
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port 3000");
})
