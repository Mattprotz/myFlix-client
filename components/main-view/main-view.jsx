import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import {NavigationBar} from "../navigation-bar/navigation-bar.jsx";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")); //pulling stored user data from local storage
  const storedToken = localStorage.getItem("token"); //no need to parse: not in json format
  const [user, setUser] = useState(storedUser ? storedUser : null); //exist stored user? useState of stored user, else null
  const [token, setToken] = useState(storedToken ? storedToken : null); //exist stored token? useState of stored token, else null

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  //initialize token from useState
  useEffect(() => {
    if (!token) return;

    fetch("https://myflix-movienet-6e137990a158.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        console.log(data);
      });
  }, [token]);

  return (
    <BrowserRouter>
    <NavigationBar user={user} onLoggedOut={()=>{setUser(null); setToken(null)}}/>
      <Container>
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
              )
            }
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignupView />}
          />
          <Route
            path="/movies/:movieId"
            element={
              selectedMovie ? (
                <MovieView
                  movie={selectedMovie}
                  onBackClick={() => setSelectedMovie(null)}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <div>Movies list is empty!</div>
              ) : (
                <div>
                  {movies.map((movie) => (
                    <Col className="mb-5" key={movie._id} md={3}>
                      <MovieCard
                        key={movie}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                          setSelectedMovie(newSelectedMovie);
                        }}
                      />
                    </Col>
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
              )
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
