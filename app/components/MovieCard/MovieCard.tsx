import { type FC, useState, useEffect } from 'react';
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
  const placeholder = './poster-placeholder';
  const [isFavorite, setIsFavorite] = useState<boolean>(() => getInitialFavoriteState(movie.imdbID));

  useEffect(() => {
    localStorage.setItem(`favorite-${movie.imdbID}`, isFavorite ? 'true' : 'false');
  }, [isFavorite]);

  return (
    <div className="movie-card">
      <div className="image-container">
        <img src={Poster !== 'N/A' ? Poster : placeholder} alt={Title} className="poster" />
        {Type !== 'movie' && <div className="type-label">{Type.toUpperCase()}</div>}
        <button className="favorite-button" onClick={() => setIsFavorite((prev) => !prev)} data-testid="favorite-icon">
          {isFavorite ? (
            <MdFavorite className="favorite-icon active" />
          ) : (
            <MdFavoriteBorder className="favorite-icon" />
          )}
        </button>
        <div className="overlay">
          <h3 className="title">{Title}</h3>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
