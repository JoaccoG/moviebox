import { useLocation } from 'react-router';
import { useMovies } from '@contexts/movies/context';
import Spinner from '@shared/Spinner/Spinner';
import ErrorComponent from '@shared/ErrorComponent/ErrorComponent';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '@components/MovieCard/MovieCard';
import './MoviesList.css';

const MoviesList = () => {
  const location = useLocation();
  const { movies, getNextMovies, loading, error } = useMovies();

  const handleOfferClick = () => {
    // TODO: Implementar la funcionalidad de oferta:
    // Abrir un modal donde el usuario elija entre diferentes opciones y en base a esas opciones
    // mostrar una lista de películas que coincidan con los criterios.
    console.log('Offer clicked');
  };

  const handleNext = () => {
    getNextMovies({
      title: new URLSearchParams(location.search).get('q') ?? '',
      page: movies?.currentPage ? movies.currentPage + 1 : 1
    });
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <div className="flex flex-col items-center justify-center flex-grow h-full text-white">
      {(!movies || movies.movies.length === 0) && (
        <div className="flex flex-col items-center justify-center flex-grow h-full">
          <img
            src="/assets/img/idle-search.svg"
            alt="Idle Search"
            className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 xl:w-100 xl:h-100"
          />
          <h2 className="font-semibold font-size-xl text-center w-full">Don&apos;t know what to search?</h2>
          <button className="offerButton" onClick={handleOfferClick}>
            Here&apos;s an offer you can&apos;t refuse
          </button>
        </div>
      )}

      {movies && movies.movies.length > 0 && (
        <InfiniteScroll
          next={handleNext}
          dataLength={movies.movies.length}
          hasMore={movies.movies.length < movies.totalResults}
          scrollThreshold={0.9}
          loader={<Spinner height={'32'} />}
          endMessage={null}>
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full max-w-5xl moviesListContainer"
            data-testid="movies-list">
            {movies.movies.map((movie) => (
              <li key={movie.imdbID} className="flex justify-center">
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default MoviesList;
