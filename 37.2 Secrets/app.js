//jshint esversion:6

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/userDB");
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String
})

const User = new mongoose.model("User", userSchema);

app.use(express.static("public"));
app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
})

app.get("/login", (req, res) => {
  res.render("login");
})

app.get("/register", (req, res) => {
  res.render("register");
})

app.post("/register", async (req, res) => {

  bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
    const newUser = new User({
      email: req.body.username,
      password: hash
    })

    const user = await newUser.save();

    if (user) {
      res.render("secrets");
    } else {
      console.log("error!");
    }
  });

})

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email: username }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (result === true) {
          res.render("secrets");
        }
      });

    } else {
      console.log("rejected!");
    }
  })
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
})
