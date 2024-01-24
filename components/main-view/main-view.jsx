import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
  const [movies, setMovies] = useState([
    
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(()=>{
    fetch("https://openlibrary.org/search.json?q=star+wars")
      .then((response) => response.json())
      .then((data) =>{
        const moviesFromAPI = data.docs.map((doc)=>{
          return{
            id: doc.key,
            title: doc.title,
            image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
            author: doc.author_name?.[0]
          };
        });
        setMovies(moviesFromAPI);
      });
  }, []);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>;
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