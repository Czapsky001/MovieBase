const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
const FavouriteMovie = require("./model/FavouriteMovie.js");
const User = require("./model/User.js")

app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// mongoose.connect("mongodb+srv://krzysztofbinkofirma:krzysztofbinkofirma@cluster0.1p2gegh.mongodb.net/");
mongoose.connect(
  "mongodb+srv://Szymon:Flt0GL3hBFB9pRpa@szymon.3gdulcz.mongodb.net/"
);

app.post("/FavouriteMovies", (req, res) => {
  try {
    const movieID = req.body.imdbID;

    fetch(`https://omdbapi.com/?apikey=98943cb5&i=${movieID}&plot=full`)
      .then((response) => response.json())
      .then((data) => {
        const movie = new FavouriteMovie({
          title: data.Title,
          year: data.Year,
          actors: data.Actors,
          boxOffice: data.BoxOffice,
          genre: data.Genre,
          plot: data.Plot,
          img: data.Poster,
        });
        movie.save();
        res.json(movie);
      });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
app.get("/FavouriteMovies"),
  (req, res) => {
    FavouriteMovie.find()
      .then((movie) => res.json(movie))
      .catch((err) => res.status(500).json({ error: err.message }));
  };
app.delete("/FavouriteMovies", async (req, res) => {
  try {
    const title = req.body.Title;
    const deletedMovie = await FavouriteMovie.findOneAndDelete({ title });
    if (!deletedMovie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found." });
    }
    res.status(200).json({ success: true, deletedMovie });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.post("/register", (req, res) => {
  try {
    //todo get from request username password and maybe other details
    //save user model to mongoDB
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    
    const user = await User.findOne({ username: username });
    console.log(user.password, user.username, password, username, user.password === password)
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    } else {
      if (user.password !== password) {
        res.status(402).json({ success: false, message: "Wrong password" });
      } else {
        res.status(200).json({ success: true, message: "Welcome" });
      }
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
app.listen(3000, () => console.log("server nadaje na policji"));
