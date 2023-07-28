//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// create Schema to define Model for blog post(s)
const postSchema = ({
  title: String,
  content: String,
});

// create a new instance of a Post model based on the defined schema
const Post = mongoose.model("Post", postSchema);

// setup Mongoose DB connection
main().catch(function (err) {
  console.log(err);
})

async function main() {
  await mongoose.connect("mongodb+srv://admin:test123@cluster0.hz4f6x7.mongodb.net/blogDB");
}

app.get("/", async function (req, res) {

  await Post.find({}).then(function (foundPosts) {
    if (foundPosts) {
      console.log("AM I GETTING HIT?");
      res.render("home", {
        startingContent: homeStartingContent,
        posts: foundPosts
      });
    } else {
      console.error("Error getting blog posts!");
    }
  })

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", async function (req, res) {

  // create new document and insert into 'posts' collection
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  })

  await post.save().then(function (postSaved) {
    if (!postSaved) {
      console.error("ERROR IN SAVING POST", postSaved);
    } else {
      res.redirect("/");
    }
  })

})

app.get("/posts/:postId", async function (req, res) {
  const requestedPostId = req.params.postId;

  await Post.findOne({ _id: requestedPostId }).then(function (foundPost) {
    if (foundPost) {

      console.log("POST FOUND!");

      res.render("post", {
        title: foundPost.title,
        content: foundPost.content
      })
    } else {
      console.log("POST NOT FOUND!");
    }
  }).catch(function (err) {
    console.log("*********FAIL*******");
    console.error("FAILED. THIS IS THE 'CATCH' ERROR MSG: ", err)
    console.error("FAILED. THIS IS THE 'CATCH' ERROR MSG: ", err.message);
;

  })
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
