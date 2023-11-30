import React from "react";

function MoreMovieInfo({ movieInfo }) {
  return (
    <div>
      <h2>{movieInfo.Title}</h2>
      <p>Year: {movieInfo.Year}</p>
      <p>Actors: {movieInfo.Actors}</p>
      <p>BoxOffice: {movieInfo.BoxOffice}</p>
      <p>Director: {movieInfo.Director}</p>
      <p>Writer: {movieInfo.Writer}</p>
      <p>Released: {movieInfo.Released}</p>
      <p>Type: {movieInfo.Type}</p>
      <p>Plot: {movieInfo.Plot}</p>
      <img src={movieInfo.Poster} alt={movieInfo.Title}></img>
    </div>
  );
}

export default MoreMovieInfo;
