import { Link, useLocation } from 'react-router';
import './Header.style.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="flex items-center justify-between p-s">
      <Link to="/" className="flex items-center">
        <img src="/assets/img/logo.svg" alt="MovieBox Logo" className="w-[35px] h-[35px] md:w-[50px] md:h-[50px]" />
        <h1 className="ml-xs md:ml-s color-neutral-light font-weight-bold text-s md:text-xl header-title">MovieBox</h1>
      </Link>
      <Link to={`/favorites${location.search}`} className="flex items-center favorites-link">
        Favorites
      </Link>
    </header>
  );
};

export default Header;
