const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");
}

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
})

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", async (req, res) => {
  await Article.find()
    .then((foundArticles => {res.send(foundArticles);
    }))
    .catch(err => {
      res.send(err);
    });
});

app.post("/articles", (req, res) => {
  console.log(req.body.title);
  console.log(req.body.content);

  // await Article.create();
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
