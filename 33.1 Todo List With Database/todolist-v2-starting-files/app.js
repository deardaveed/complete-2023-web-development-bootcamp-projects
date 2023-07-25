//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//setup to connect MongooseDB:
main().catch(function (err) {
  console.log(err);
});

//no longer added to add 2nd parameter to connect method, {usNewUrlParser}
async function main() {
  await mongoose.connect("mongodb://localhost:27017/todolistDB");

  // 1. define schema
  const itemsSchema = new mongoose.Schema({
    name: String
  });

  // 2. create new Model based on above schema
  const Item = mongoose.model("Item", itemsSchema);

  // 3. create new document based on above
  const item1 = new Item({
    name: "Exciting todo list item #1!"
  });

  const item2 = new Item({
    name: "Exciting todo list item #2!"
  });

  const item3 = new Item({
    name: "Exciting todo list item #3!"
  });

  const defaultItems = [item1, item2, item3];

  app.get("/", function (req, res) {

    try {
      Item.find({}).then(function (foundItems) {

        if (foundItems.length === 0) {

          try {
            Item.insertMany(defaultItems);
            console.log("Items entered successfully");
          } catch (err) {
            console.error("Error inserting items!", err);
          }
          // res.redirect("/");
        } else {

          res.render("list", { listTitle: "Today", newListItems: foundItems });

        }
      })
    } catch (err) {
      console.error("Not found!", err);
    }

  });

  app.post("/", function (req, res) {

    const item = req.body.newItem;

    if (req.body.list === "Work") {
      workItems.push(item);
      res.redirect("/work");
    } else {
      items.push(item);
      res.redirect("/");
    }
  });

  app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
  });

  app.get("/about", function (req, res) {
    res.render("about");
  });

  app.listen(3000, function () {
    console.log("Server started on port 3000");
  });
}
