const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
  name: {
     type: String, default: "Какой то жанр"
     },
  description: {
    type: String,
    default: "ай донт ноу что тут писать",
  },
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;