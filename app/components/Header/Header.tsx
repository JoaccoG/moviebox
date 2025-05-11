import { Link } from 'react-router';
import './Header.style.css';

export const Header = () => {
  return (
    <header className="flex items-center p-s">
      <Link to="/" className="flex items-center">
        <img src="./logo.svg" alt="MovieBox Logo" className="w-[35px] h-[35px] md:w-[50px] md:h-[50px]" />
        <h1 className="ml-xs md:ml-s color-primary font-weight-bold text-s md:text-xl">MovieBox</h1>
      </Link>
    </header>
  );
};
