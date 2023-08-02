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

//route handlers for all articles
app.route("/articles")

  .get(async (req, res) => {
    await Article.find()
      .then(
        (foundArticles => { res.send(foundArticles); }))
      .catch(
        err => { res.send(err); });
  })

  .post(async (req, res) => {
    await Article
      .create({
        title: req.body.title,
        content: req.body.content
    })
      .then(
        res.send("Successfully added a new article!"))
      .catch(
        err => { res.send(err) });
  })

  .delete(async (req, res) => {
    await Article.deleteMany()
      .then(
        res.send("Successfully deleted all articles!"))
      .catch(
        err => { res.send(err) });
  });

//route handlers for a specific article
app.route("/articles/:articleTitle")

  .get(async (req, res) => {
    try {
      const article = await Article.findOne({ title: req.params.articleTitle });
      if (article) {
        res.send("Successfully found the specific article!");
      } else {
        res.send("No articles matching that title was found!");
      }
    } catch (err) {
      res.send(err);
    }
  })

  .put(async (req, res) => {
    try {
      const updateArticle = await Article.updateOne({ title: req.params.articleTitle },
        { title: req.body.title, content: req.body.content });

      if (updateArticle.modifiedCount > 0) {
        res.send("Update was successful");
      } else {
        res.send("Error in updating article!")
      }
    } catch (err) {
      res.status(500).send(err);
    }
  })

  .delete(async (req, res) => {
    try {
      const deletedArticle = await Article.findOneAndDelete(
        { title: req.params.articleTitle }
      );

      if (deletedArticle) {
        res.send("Article was deleted: ", deletedArticle);
      } else {
        res.send("Could not find article to delete.");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
