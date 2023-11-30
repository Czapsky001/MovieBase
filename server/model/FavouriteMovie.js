const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const FavouriteMovieSchema = new Schema({
  title: String,
  year: Number,
  actors: Array,
  boxOffice: String,
  genre: Array,
  plot: String,
  img: String,
});

const FavouriteMovie = model("FavouriteMovie", FavouriteMovieSchema);

module.exports = FavouriteMovie;
