import React, { useEffect, useState, useContext } from "react";
import MoreMovieInfo from "../MoreMovieInfo";
import movies from "../Movies.js";
import AppBar from "../AppBar.js";
import AuthContext from "../AuthContext";
import LoginForm from "../LoginForm";
import "./MainPage.css";
import {API_URL, API_KEY} from "../../environments.js"

function MainPage() {
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [moreMovieInfo, setMoreMovieInfo] = useState({});
  const [showMovieInfo, setShowMovieInfo] = useState(false);
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    setMoviesList(movies);
  }, []);

  async function handleSubmit() {
    const response = await fetch(
      `${API_URL}/?apikey=${API_KEY}&s=${
        searchValue !== "the" && searchValue
      }&plot=full`
    );
    const data = await response.json();
    setSelectedMovie(data);
    setButtonIsClicked(true);
  }

  async function handleClickMovie(event) {
    const movieID = event.imdbID;
    const response = await fetch(
      `https://omdbapi.com/?apikey=98943cb5&i=${movieID}&plot=full`
    );
    const data = await response.json();
    setMoreMovieInfo(data);
    setShowMovieInfo(true);
    setButtonIsClicked(true);
  }
  async function handleClick(movie) {
    const updatedMovies = moviesList?.map((m) => {
      if (m.imdbID === movie.imdbID) {
        return {
          ...m,
          addButtonClicked: !m.addButtonClicked,
        };
      }
      return m;
    });
    const updatedSelectedMovies = {
      ...selectedMovie,
      Search: selectedMovie.Search?.map((m) => {
        if (m.imdbID === movie.imdbID) {
          return {
            ...m,
            addButtonClicked: !m.addButtonClicked,
          };
        }
        return m;
      }),
    };

    try {
      if (movie.addButtonClicked || selectedMovie.addButtonClicked) {
        const response = await fetch("http://localhost:3000/FavouriteMovies", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(movie),
        });

        if (!response.ok) {
          throw new Error("Failed to delete movie from favorites.");
        }
        console.log("delete movies", movie)

        await response.json();
      } else {
        const response = await fetch("http://localhost:3000/FavouriteMovies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(movie),
        });

        if (!response.ok) {
          throw new Error("Failed to add movie to favorites.");
        }

        const data = await response.json();
        console.log(data);
      }

      setMoviesList(updatedMovies);
      setSelectedMovie(updatedSelectedMovies);
    } catch (error) {
      console.error("Error:", error);
      movie.addButtonClicked = !movie.addButtonClicked;
    }
  }
  return (
    <div className="main-container">
      <AppBar
        handleSubmit={handleSubmit}
        handleChange={(e) => setSearchValue(e.target.value)}
      />

      {state.loginClicked ? (
        <LoginForm />
      ) : buttonIsClicked ? (
        <div className="movie-list">
          {showMovieInfo ? (
            <MoreMovieInfo movieInfo={moreMovieInfo}></MoreMovieInfo>
          ) : (
            selectedMovie.Search?.map((m) => (
              <div className="movie-item" key={m.imdbID}>
                <h2>Title: {m.Title}</h2>
                <p>Year: {m.Year}</p>
                {m?.Poster !== "N/A" && (
                  <img className="poster" src={m?.Poster} alt={m.Title} />
                )}
                <p
                  className="add-button"
                  onClick={() => handleClick(m)}
                >
                  <strong>{m.addButtonClicked ? "Remove" : "Add"}</strong>
                </p>
                <button
                  className="more-info-button"
                  onClick={() => handleClickMovie(m)}
                >
                  Show more info
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="movieContainer">
          {moviesList.map((m) => (
            <div className="movie-item" key={m.imdbID}>
              <h2>{m.Title}</h2>
              <p>{m.Year}</p>
              <p>{m.Type}</p>
              {m?.Poster !== "N/A" && (
                <div className="imgContainer">
                  <img className="poster" src={m?.Poster} alt={m.Title} />
                </div>
              )}
              <p
                className="add-button"
                onClick={() => handleClick(m)}
              >
                <strong>{m.addButtonClicked ? "Remove" : "Add"}</strong>
              </p>
              <button
                className="more-info-button"
                onClick={() => handleClickMovie(m)}
              >
                Show more info
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainPage;
