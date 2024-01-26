import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { MovieCard } from "../movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")); //pulling stored user data from local storage
  const storedToken = localStorage.getItem("token"); //no need to parse: not in json format
  const [user, setUser] = useState(storedUser ? storedUser : null); //exist stored user? useState of stored user, else null
  const [token, setToken] = useState(storedToken ? storedToken : null); //exist stored token? useState of stored token, else null

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://myflix-movienet-6e137990a158.herokuapp.com")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromAPI = data.map((movie) => {
          return {
            _id: movie.id,
            title: movie.title,
            director: movie.director.name,
          };
        });
        setMovies(moviesFromAPI);
      });
  }, []);

  //initialize token from useState
  useEffect(() => {
    if (!token) return;

    fetch("https://myflix-movienet-6e137990a158.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <SignupView />
      </>
    );
  }

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
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
      </div>
    );
  }
};
