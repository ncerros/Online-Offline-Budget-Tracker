const logger = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/budget-tracker", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`Budget Tracker is running on port ${PORT}!`);
});