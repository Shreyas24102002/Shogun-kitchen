const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://shreyas-social:yash@cluster0.bpkouf1.mongodb.net/Food",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

const foodSchema = {
  name: String,
  phone: String,
  order: String,
};

const Food = mongoose.model("Food", foodSchema);

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

app.get("/check", async function (req, res) {
  let food;
  try {
    food = await Food.find();
  } catch (error) {
    console.log(error);
  }

  if (!food) {
    return res.status(404).json({ message: "No Order Found!!" });
  }
  return res.status(200).json({ food });
});

app.post("/add", function (req, res) {
  let newFood = new Food({
    name: req.body.name,
    phone: req.body.phone,
    order: req.body.order,
  });
  newFood.save();
  res.redirect("http://127.0.0.1:5500/index.html");
});

app.listen(5000, function () {
  console.log("server is running on 5000");
});

// mongodb+srv://shreyas-social:yash@cluster0.bpkouf1.mongodb.net/Food
