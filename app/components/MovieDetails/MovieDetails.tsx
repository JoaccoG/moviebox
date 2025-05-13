import { type FC, useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import type { MovieDetails as TypeMovieDetails } from '@type/movies';
import { useMovies } from '@contexts/movies/context';
import Spinner from '@components/Spinner/Spinner';
import ErrorComponent from '@components/ErrorComponent/ErrorComponent';
import './MovieDetails.css';

interface MovieDetailsProps {
  id: string | undefined;
}

const MovieDetails: FC<MovieDetailsProps> = ({ id }) => {
  const { movie, setMovie, getMovie, loading, error } = useMovies();

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    setMovie(null);
    if (id) await getMovie({ id, query: 'plot=full' });
  };

  const parseRuntime = (runtime: string): string => {
    const [minutes] = runtime.split(' ');
    const hours = Math.floor(Number(minutes) / 60);
    const remainingMinutes = Number(minutes) % 60;

    return `${hours}h ${remainingMinutes}m •`;
  };

  const isDetailsGridNeeded = (movie: TypeMovieDetails): boolean => {
    return (
      !!movie.Actors &&
      movie.Actors !== 'N/A' &&
      !!movie.Genre &&
      movie.Genre !== 'N/A' &&
      !!movie.Director &&
      movie.Director !== 'N/A' &&
      !!movie.Writer &&
      movie.Writer !== 'N/A'
    );
  };

  const renderList = (list: string): React.JSX.Element => {
    return (
      <>
        {list.split(', ').map((item) => (
          <span key={item} data-fulltext={item} title={item}>
            - {item}
            <br />
          </span>
        ))}
      </>
    );
  };

  return (
    <section className="movie-details-container">
      <button className="back-button w-[35px] h-[35px] md:w-[50px] md:h-[50px]" onClick={() => window.history.back()}>
        <IoIosArrowRoundBack className="back-icon w-[35px] h-[35px] md:w-[50px] md:h-[50px]" />
      </button>

      <section className="movie-details-subcontainer">
        {loading && (
          <div className="flex items-center justify-center w-full h-100">
            <Spinner />
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center w-full h-100">
            <ErrorComponent error={error} />
          </div>
        )}

        {movie && !loading && !error && (
          <>
            <div className="movie-details-poster">
              <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            </div>

            <section className="movie-details-content">
              <h1 className="movie-title">{movie.Title.includes(':') ? movie.Title.split(':')[0] : movie.Title}</h1>

              {movie.Title.includes(':') && <h2 className="movie-meta">Original title: {movie.Title}</h2>}
              <p className="movie-meta">
                {movie.Runtime && movie.Runtime !== 'N/A' && parseRuntime(movie.Runtime)} {movie.Year} • {movie.Rated}
              </p>

              {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                <div className="imdb-rating">
                  <img src="/assets/img/imdb-icon.svg" alt="IMDB Logo" className="imdb-logo" />
                  <p className="rating">
                    {movie.imdbRating}
                    <span>/10</span>
                  </p>
                </div>
              )}

              {movie.Plot && movie.Plot !== 'N/A' && (
                <>
                  <h2 className="subtitle">Overview</h2>
                  <p className="subcontent">{movie.Plot}</p>
                </>
              )}

              {isDetailsGridNeeded(movie) && (
                <div className="details-grid">
                  {movie.Actors && movie.Actors !== 'N/A' && (
                    <div>
                      <h3 className="subtitle">Cast</h3>
                      <p className="subcontent">{renderList(movie.Actors)}</p>
                    </div>
                  )}

                  {movie.Genre && movie.Genre !== 'N/A' && (
                    <div>
                      <h3 className="subtitle">Genres</h3>
                      <p className="subcontent">{renderList(movie.Genre)}</p>
                    </div>
                  )}

                  {movie.Director && movie.Director !== 'N/A' && (
                    <div>
                      <h3 className="subtitle">Directors</h3>
                      <p className="subcontent">{renderList(movie.Director)}</p>
                    </div>
                  )}

                  {movie.Writer && movie.Writer !== 'N/A' && (
                    <div>
                      <h3 className="subtitle">Writers</h3>
                      <p className="subcontent"> {renderList(movie.Writer)}</p>
                    </div>
                  )}
                </div>
              )}
            </section>
          </>
        )}
      </section>
    </section>
  );
};

export default MovieDetails;
