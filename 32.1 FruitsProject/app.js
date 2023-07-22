const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 2,
  review: "Pretty yummy"
});

// fruit.save();

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

const findAndPrintFruits = async () => {
  try {
    const results = await Fruit.find();

    mongoose.connection.close();

    results.forEach(function(result) {
      console.log(result.name);
    });
  } catch (err) {
    console.error("Error getting results!", err);
  }
};

// findAndPrintFruits();

// quick way to update entry without try/catch block:
// ----------
// async function updateFruit() {
//   await Fruit.updateOne({ _id: "64bb7c246ef38c0a6f5d4a44" }, { name: "Strawberry" });
// }

// updateFruit();

// update entry without try/catch block, using function declaration:
// ------------
// (async function() {
//   await Fruit.updateOne({ _id: "64bb7c246ef38c0a6f5d4a44" }, { name: "Cabinet" });
// })();

// same as above, but more succinct:
// (async () => {
//   await Fruit.updateOne({ _id: "64bb7c246ef38c0a6f5d4a44" }, { name: "Cabinet" });
// })();

// using function expression with try/catch block..
// const updateEntry = async () => {
//   try {
//     const update = await Fruit.updateOne({ _id: "64bb7c246ef38c0a6f5d4a44" }, { rating: 3 });
//   } catch (err) {
//     console.error("Error updating entry!");
//   }
// }

// updateEntry();

// (async () => {
//   await Fruit.deleteOne({ name: "Cabinet" });
// })();

async function deleteOneFruit() {
  await Fruit.deleteOne({ name: "Apple" });
  mongoose.connection.close();
}

deleteOneFruit();
