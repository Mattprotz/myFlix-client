import React from "react";

export const MovieCard = (props) => {
  return (
    <div
      onClick={() => {
        props.onMovieClick(props.movie);
      }}
    >
      {props.movie.title}
    </div>
  );
};
