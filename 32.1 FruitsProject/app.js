const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty yummy"
});

// fruit.save()
const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "John",
  age: 37
});

// person.save();

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 2,
  review: "Not my favorite!"
})

const pineapple = new Fruit({
  name: "Pineapple",
  rating: 9,
  review: "As sweet as you!"
})

const watermelon = new Fruit({
  name: "Watermelon",
  rating: 10,
  review: "What is there to say?"
})

Fruit.insertMany([kiwi, pineapple, watermelon])
  .then((insertedFruits) => {
    console.log("Inserted fruits:", insertedFruits);
  })
  .catch((err) => {
    console.error("Error inserting fruits:", err);
})
