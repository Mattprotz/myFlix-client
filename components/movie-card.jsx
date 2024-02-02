import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMovieClick }) => {
  const handleClick = () => {
    onMovieClick(movie);
  };

  return (
    <Card onClick={handleClick} variant="link">
      <Card.Img variant="top" src={movie.img} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    director: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
