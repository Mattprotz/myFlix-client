import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { MovieCard } from "../movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://myflix-movienet-6e137990a158.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("data from API:", JSON.stringify(data));
        const moviesFromAPI = data.map((movie) => {
          return {
            _id: movie.id,
            title: movie.title,
            director: movie.director.name
          };
        });
        setMovies(moviesFromAPI);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>Movies list is empty!</div>;
  } else {
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  }
};
