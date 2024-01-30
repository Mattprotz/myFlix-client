import React from "react";


export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} alt={movie.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{typeof movie.title === "string" ? movie.title : ""}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{typeof movie.director.name === "string" ? movie.director.name : ""}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
