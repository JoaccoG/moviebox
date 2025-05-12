import { type FC, useState } from 'react';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import type { Movie } from '@type/movies';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const { Title, Poster, Type } = movie;
  const placeholder = './poster-placeholder';
  const [isFavorite, setIsFavorite] = useState<boolean>(localStorage.getItem(`favorite-${movie.imdbID}`) === 'true');

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    localStorage.setItem(`favorite-${movie.imdbID}`, !isFavorite ? 'true' : 'false');
  };

  return (
    <div className="movie-card">
      <div className="image-container">
        <img src={Poster !== 'N/A' ? Poster : placeholder} alt={Title} className="poster" />
        {Type !== 'movie' && <div className="type-label">{Type.toUpperCase()}</div>}
        <button className="favorite-button" onClick={toggleFavorite}>
          {isFavorite ? <MdFavorite className="favorite-icon" /> : <MdFavoriteBorder className="favorite-icon" />}
        </button>
        <div className="overlay">
          <h3 className="title">{Title}</h3>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
