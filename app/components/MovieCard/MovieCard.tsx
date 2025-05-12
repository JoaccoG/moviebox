import { type FC, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import type { Movie } from '@type/movies';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
}

const getInitialFavoriteState = (imdbID: string): boolean => {
  return localStorage.getItem(`favorite-${imdbID}`) === 'true';
};

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const { Title, Poster, Type } = movie;
  const imgPlaceholder = '/assets/img/movie-card-poster-placeholder.svg';
  const [isFavorite, setIsFavorite] = useState<boolean>(() => getInitialFavoriteState(movie.imdbID));
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem(`favorite-${movie.imdbID}`, isFavorite ? 'true' : 'false');
  }, [isFavorite]);

  return (
    <div className="movie-card">
      <div className="image-container">
        <Link to={`/details/${movie.imdbID}`} className="link">
          <img
            src={Poster === 'N/A' || !isImageLoaded ? imgPlaceholder : Poster}
            alt={Title}
            className="poster"
            onError={() => setIsImageLoaded(false)}
          />
          {Type !== 'movie' && <div className="type-label">{Type.toUpperCase()}</div>}
          <button
            className="favorite-button"
            onClick={() => setIsFavorite((prev) => !prev)}
            data-testid="favorite-icon">
            {isFavorite ? (
              <MdFavorite className="favorite-icon active" />
            ) : (
              <MdFavoriteBorder className="favorite-icon" />
            )}
          </button>
          <div className="overlay">
            <h3 className="title">{Title}</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
