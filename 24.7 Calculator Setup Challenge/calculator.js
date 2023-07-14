const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/bmicalculator", function (req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function (req, res) {

  let { weight, height } = req.body;

  weight = parseFloat(weight);
  height = parseFloat(height);

  // console.log(req.body);
  // let weight = parseFloat(req.body.weight);
  // let height = parseFloat(req.body.height);

  let bmi = weight / (height * height);

  res.send("Your BMI is: " + bmi)
});

app.listen(3000, function () {
  console.log("listening on port 3000");
});
